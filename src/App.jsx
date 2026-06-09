import { useState, useEffect } from 'react';
import { createLenis } from './lib/lenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import MenuMarquee from './components/MenuMarquee';
import MenuGrid from './components/MenuGrid';
import InstagramFeed from './components/InstagramFeed';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Mains');

  useEffect(() => {
    const lenis = createLenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    const id = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(id); };
  }, []);

  function handleMarqueeClick(category) {
    setActiveCategory(category);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Nav />
      <Hero />
      <Philosophy />
      <MenuMarquee onCategoryClick={handleMarqueeClick} />
      <MenuGrid activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Testimonials />
      <About />
      <InstagramFeed />
      <Footer />
    </>
  );
}
