'use client';

import { useEffect, useRef, useCallback } from 'react';

const projects = [
  {
    title: 'Smart AI-Powered Stethoscope',
    desc: 'An AI-driven digital stethoscope integrating machine learning classification algorithms to analyze heart sounds and detect murmurs or anomalies in real time.',
    tags: ['AI', 'Biomedical', 'Embedded'],
    icon: '🩺',
    color: 'var(--cyan)',
    glow: 'rgba(0,212,255,0.15)',
  },
  {
    title: 'Biomedical Internship Guide E-book',
    desc: 'Author of a comprehensive guide outlining internship pathways, diagnostic equipment protocols, and medical technology workflows for biomedical students.',
    tags: ['Healthcare', 'Biomedical'],
    icon: '📖',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.15)',
  },
  {
    title: 'AI & Smart Wearables Presentation',
    desc: 'Delivered an in-depth technical analysis and presentation on the integration of neural networks in clinical-grade smart wearables and physiological monitoring.',
    tags: ['AI', 'Healthcare', 'ML'],
    icon: '📊',
    color: 'var(--orange)',
    glow: 'rgba(255,107,53,0.15)',
  },
  {
    title: 'AI-Based Drowsiness Detection System',
    desc: 'Arduino-based real-time driver drowsiness detection using computer vision and eye-tracking machine learning algorithms to prevent road accidents.',
    tags: ['AI', 'Embedded', 'Arduino'],
    icon: '😴',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.15)',
  },
  {
    title: 'Pulse Oximeter using ESP32',
    desc: 'Wireless pulse oximeter measuring SpO₂ and heart rate with ESP32 microcontroller and cloud data dashboard integration.',
    tags: ['IoT', 'Embedded', 'ESP32'],
    icon: '💓',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.15)',
  },
  {
    title: 'Smart Wearable Health Monitoring Bracelet',
    desc: 'IoT wristband bracelet tracking body temperature, heart rate, and steps with automated threshold breach alerts.',
    tags: ['IoT', 'Embedded', 'AI'],
    icon: '⌚',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.15)',
  },
  {
    title: 'ECG Monitoring System',
    desc: 'Design concept for a low-cost, portable ECG monitoring system capable of remote cardiac rhythm analysis and arrhythmia detection.',
    tags: ['AI', 'Biomedical'],
    icon: '📈',
    color: '#7dd3fc',
    glow: 'rgba(125,211,252,0.15)',
  },
  {
    title: 'Hospital Management System',
    desc: 'Full-stack Python web application for clinical record management, appointment schedules, and patient billing records.',
    tags: ['Python', 'Web'],
    icon: '🏥',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.15)',
  },
];

const tagColorMap: Record<string, string> = {
  AI:         'tag-ai',
  IoT:        'tag-iot',
  Embedded:   'tag-embed',
  Arduino:    'tag-embed',
  ESP32:      'tag-embed',
  Python:     'tag-python',
  Web:        'tag-python',
  ML:         'tag-ai',
  Healthcare: 'tag-ai',
  Biomedical: 'tag-bio',
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.proj-card', { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '#projects', start: 'top 80%' },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    initGSAP();
  }, []);

  /* 3D Tilt effect */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    card.style.transition = 'transform 0.5s ease';
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transition = 'transform 0.1s ease';
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-wrapper">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,212,255,0.04), transparent)' }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">05 — Projects</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Built with <span style={{ color: 'var(--cyan)' }}>Purpose</span>
          </h2>
          <p className="text-white/50 text-base max-w-2xl mx-auto">
            From AI-driven diagnostics to IoT wearables — each project is a step toward transforming healthcare through technology.
          </p>
          <div className="gradient-divider mt-8" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="proj-card project-card"
              style={{ opacity: 0, cursor: 'default' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: proj.glow, border: `1px solid ${proj.color}30` }}
              >
                {proj.icon}
              </div>

              {/* Title */}
              <h3
                className="font-semibold text-sm mb-2 leading-snug"
                style={{ color: proj.color, fontFamily: 'var(--font-display)', minHeight: '2.5rem' }}
              >
                {proj.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">{proj.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {proj.tags.map(tag => (
                  <span key={tag} className={`tag ${tagColorMap[tag] ?? 'tag-bio'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
