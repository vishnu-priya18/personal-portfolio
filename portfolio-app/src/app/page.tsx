'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import About from '@/components/About';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Internship from '@/components/Internship';
import Certificates from '@/components/Certificates';
import Achievements from '@/components/Achievements';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Internship />
      <Certificates />
      <Achievements />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
