import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Builds one low-poly 3D flower: a small center sphere + petals arranged
// radially around it, each petal a flattened sphere tilted outward.
function createFlower() {
  const group = new THREE.Group()

  const petalColors = [0xace1af, 0xd0f0c0, 0xf0fff0]
  const petalColor = petalColors[Math.floor(Math.random() * petalColors.length)]
  const petalCount = 5 + Math.floor(Math.random() * 2) // 5 or 6 petals
  const petalGeometry = new THREE.SphereGeometry(0.32, 8, 6)
  const petalMaterial = new THREE.MeshStandardMaterial({
    color: petalColor,
    roughness: 0.6,
    metalness: 0.05,
    transparent: true,
    opacity: 0.92,
  })

  for (let i = 0; i < petalCount; i++) {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial)
    const angle = (i / petalCount) * Math.PI * 2
    const radius = 0.32

    petal.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    petal.scale.set(1, 1, 0.35) // flatten into a petal shape
    petal.rotation.z = angle
    group.add(petal)
  }

  // center
  const centerGeometry = new THREE.SphereGeometry(0.2, 10, 8)
  const centerMaterial = new THREE.MeshStandardMaterial({
    color: 0x228b22,
    roughness: 0.5,
    metalness: 0.1,
  })
  const center = new THREE.Mesh(centerGeometry, centerMaterial)
  group.add(center)

  const overallScale = 0.7 + Math.random() * 0.9
  group.scale.setScalar(overallScale)

  return group
}

export default function FloatingScene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xf0fff0, 1.0))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1)
    dirLight.position.set(4, 6, 8)
    scene.add(dirLight)

    const flowerCount = 14
    const flowers = []

    for (let i = 0; i < flowerCount; i++) {
      const flower = createFlower()
      flower.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        -Math.random() * 20 - 4
      )
      flower.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.006,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        rotSpeedZ: (Math.random() - 0.5) * 0.008,
        driftSpeed: 0.012 + Math.random() * 0.018,
        driftX: (Math.random() - 0.5) * 0.004,
        swayPhase: Math.random() * Math.PI * 2,
      }
      scene.add(flower)
      flowers.push(flower)
    }

    let t = 0
    let frameId
    const animate = () => {
      t += 0.01
      flowers.forEach((flower) => {
        flower.rotation.x += flower.userData.rotSpeedX
        flower.rotation.y += flower.userData.rotSpeedY
        flower.rotation.z += flower.userData.rotSpeedZ
        flower.position.z += flower.userData.driftSpeed
        flower.position.x += Math.sin(t + flower.userData.swayPhase) * 0.003

        if (flower.position.z > 13) {
          flower.position.z = -24
          flower.position.x = (Math.random() - 0.5) * 14
          flower.position.y = (Math.random() - 0.5) * 8
        }
      })
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      flowers.forEach((flower) => {
        flower.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) obj.material.dispose()
        })
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="pointer-events-none absolute inset-0" />
}