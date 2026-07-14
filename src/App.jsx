import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './sections/Home.jsx'
import OurStory from './sections/OurStory.jsx'
import Details from './sections/Details.jsx'
import Gallery from './sections/Gallery.jsx'
import RSVP from './sections/RSVP.jsx'

function App() {
  return (
    <div>
      <Navbar />
      <section id="home"><Home /></section>
      <section id="story"><OurStory /></section>
      <section id="details"><Details /></section>
      <section id="gallery"><Gallery /></section>
      <section id="rsvp"><RSVP /></section>
      <Footer />
    </div>
  )
}

export default App