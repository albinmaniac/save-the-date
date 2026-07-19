import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Generates N evenly-distributed points on a sphere surface (Fibonacci
// sphere algorithm) — this is what gives the cluster its natural, even
// "fluffy pom-pom" coverage instead of random clumping/gaps.
function fibonacciSpherePoints(count, radius) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    // slight radius jitter so it reads as soft/organic, not a perfect ball
    const jitter = radius * (0.85 + Math.random() * 0.3)
    points.push(new THREE.Vector3(x, y, z).multiplyScalar(jitter))
  }
  return points
}

// Builds one baby's-breath style bouquet: a tight instanced cluster of
// tiny white/pale florets on a sphere, a few green sprigs poking through,
// and a thin ribbon tail — matching the reference photo.
function createBouquet() {
  const group = new THREE.Group()
  const clusterRadius = 0.55
  const floretCount = 60

  const floretGeometry = new THREE.IcosahedronGeometry(0.055, 0)
  const floretMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.7,
    metalness: 0.02,
  })

  const instanced = new THREE.InstancedMesh(floretGeometry, floretMaterial, floretCount)
  const dummy = new THREE.Object3D()
  const points = fibonacciSpherePoints(floretCount, clusterRadius)

  const white = new THREE.Color(0xf0fff0)
  const pale = new THREE.Color(0xd0f0c0)

  points.forEach((p, i) => {
    dummy.position.copy(p)
    const s = 0.7 + Math.random() * 0.6
    dummy.scale.setScalar(s)
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    dummy.updateMatrix()
    instanced.setMatrixAt(i, dummy.matrix)
    instanced.setColorAt(i, Math.random() < 0.85 ? white : pale)
  })
  instanced.instanceMatrix.needsUpdate = true
  if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true
  group.add(instanced)

  // a few thin green sprigs poking out through the florets
  const sprigMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.6 })
  const sprigCount = 3 + Math.floor(Math.random() * 2)
  for (let i = 0; i < sprigCount; i++) {
    const sprig = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.014, 0.4, 5), sprigMaterial)
    const angle = Math.random() * Math.PI * 2
    const tilt = 0.3 + Math.random() * 0.5
    sprig.position.set(
      Math.cos(angle) * clusterRadius * 0.5,
      -clusterRadius * 0.3,
      Math.sin(angle) * clusterRadius * 0.5
    )
    sprig.rotation.set(tilt, angle, 0)
    group.add(sprig)
  }

  // ribbon tail, hanging below the cluster — a slightly bent flat strip
  const ribbonMaterial = new THREE.MeshStandardMaterial({
    color: 0xace1af,
    roughness: 0.4,
    side: THREE.DoubleSide,
  })
  const ribbon = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.65, 1, 6), ribbonMaterial)
  ribbon.position.set(0, -clusterRadius - 0.25, 0)
  ribbon.rotation.y = 0.3
  group.add(ribbon)

  const overallScale = 0.75 + Math.random() * 0.7
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

    scene.add(new THREE.AmbientLight(0xffffff, 1.1))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
    dirLight.position.set(4, 6, 8)
    scene.add(dirLight)
    const fillLight = new THREE.DirectionalLight(0xace1af, 0.4)
    fillLight.position.set(-5, -3, 4)
    scene.add(fillLight)

    const bouquetCount = 10
    const bouquets = []

    for (let i = 0; i < bouquetCount; i++) {
      const bouquet = createBouquet()
      bouquet.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        -Math.random() * 20 - 4
      )
      bouquet.userData = {
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        driftSpeed: 0.012 + Math.random() * 0.016,
        swayPhase: Math.random() * Math.PI * 2,
      }
      scene.add(bouquet)
      bouquets.push(bouquet)
    }

    let t = 0
    let frameId
    const animate = () => {
      t += 0.01
      bouquets.forEach((bouquet) => {
        bouquet.rotation.y += bouquet.userData.rotSpeedY
        bouquet.position.z += bouquet.userData.driftSpeed
        bouquet.position.x += Math.sin(t + bouquet.userData.swayPhase) * 0.003

        if (bouquet.position.z > 13) {
          bouquet.position.z = -24
          bouquet.position.x = (Math.random() - 0.5) * 14
          bouquet.position.y = (Math.random() - 0.5) * 8
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
      bouquets.forEach((bouquet) => {
        bouquet.traverse((obj) => {
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