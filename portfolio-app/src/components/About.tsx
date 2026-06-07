'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const highlights = [
  {
    icon: '🧠',
    title: 'AI in Healthcare',
    desc: 'Exploring machine learning to revolutionise medical diagnosis, prediction, and patient monitoring systems.',
    color: 'var(--cyan)',
    border: 'rgba(0,212,255,0.2)',
  },
  {
    icon: '🔬',
    title: 'Smart Medical Devices',
    desc: 'Designing IoT-enabled wearables and embedded systems for real-time health parameter tracking.',
    color: '#a855f7',
    border: 'rgba(168,85,247,0.2)',
  },
  {
    icon: '💡',
    title: 'Innovation Mindset',
    desc: 'Driven by curiosity to create disruptive healthcare technologies that bridge engineering and medicine.',
    color: 'var(--orange)',
    border: 'rgba(255,107,53,0.2)',
  },
  {
    icon: '🩺',
    title: 'Biomedical Problem Solving',
    desc: 'Applying signal processing, ECG analysis, and clinical workflows to solve real biomedical challenges.',
    color: '#22c55e',
    border: 'rgba(34,197,94,0.2)',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.about-img', { opacity: 0, x: -60, scale: 0.95 }, {
          opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '#about', start: 'top 80%' },
        });
        gsap.fromTo('.about-text', { opacity: 0, x: 60 }, {
          opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '#about', start: 'top 80%' },
        });
        gsap.fromTo('.highlight-card', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.highlight-grid', start: 'top 85%' },
        });
      }, sectionRef);

      return () => ctx.revert();
    };
    initGSAP();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-wrapper">
      <div className="container-wide">

        {/* Section Label */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">01 — About Me</p>
          <div className="gradient-divider" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Profile Image */}
          <div className="about-img flex justify-center lg:justify-start" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Glowing ring */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--cyan), var(--orange))',
                  padding: '2px',
                  borderRadius: '24px',
                }}
              >
                <div
                  className="w-full h-full rounded-2xl"
                  style={{ background: 'var(--blue-mid)', borderRadius: '22px' }}
                />
              </div>

              {/* Glow backdrop */}
              <div
                className="absolute -inset-4 -z-10 rounded-3xl blur-2xl"
                style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.2), rgba(255,107,53,0.1), transparent 70%)' }}
              />

              <div
                className="relative overflow-hidden"
                style={{
                  width: '340px',
                  height: '420px',
                  borderRadius: '22px',
                  border: '1px solid rgba(0,212,255,0.25)',
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Vishnu Priya — Biomedical Engineering Student"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />

                {/* Overlay gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.8), transparent)' }}
                />

                {/* Status badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 glass py-2 px-3 flex items-center gap-2"
                  style={{ borderRadius: '10px' }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}
                  />
                  <span className="text-xs text-white/80 font-medium">Open to Internships & Collaborations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="about-text" style={{ opacity: 0 }}>
            <h2
              className="font-display font-bold mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.15,
              }}
            >
              Bridging{' '}
              <span style={{ color: 'var(--cyan)' }}>Medicine</span>
              <br />& <span style={{ color: 'var(--orange)' }}>Technology</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed mb-6">
              I am <strong className="text-white">Vishnu Priya</strong>, a passionate Biomedical Engineering student
              at Sona College of Technology, focused on <strong style={{ color: 'var(--cyan)' }}>AI-driven healthcare
              innovation</strong>, smart medical systems, and biomedical problem-solving.
            </p>

            <p className="text-white/60 text-base leading-relaxed mb-8">
              My mission is to integrate cutting-edge Artificial Intelligence with clinical biomedical systems to
              develop solutions that meaningfully improve patient outcomes — from real-time health monitoring to
              predictive diagnostics.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'College',    value: 'Sona College of Technology' },
                { label: 'Programme',  value: 'B.E Biomedical Engineering' },
                { label: 'Batch',      value: '2024 – 2028' },
                { label: 'Focus',      value: 'AI Healthcare & IoT Devices' },
              ].map(item => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-white/90">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="highlight-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="highlight-card glass p-6 rounded-2xl transition-all duration-300 group hover:scale-[1.02]"
              style={{ opacity: 0, borderColor: h.border }}
            >
              <div
                className="text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: `${h.border}`, fontSize: '1.5rem' }}
              >
                {h.icon}
              </div>
              <h3
                className="font-semibold text-base mb-2"
                style={{ color: h.color, fontFamily: 'var(--font-display)' }}
              >
                {h.title}
              </h3>
              <p className="text-xs text-white/55 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Career Objective */}
        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(255,107,53,0.04))',
            border: '1px solid rgba(0,212,255,0.15)',
          }}
        >
          <p className="section-label mb-4">Career Objective</p>
          <p
            className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ fontStyle: 'italic' }}
          >
            "To integrate Artificial Intelligence with Biomedical Engineering to develop innovative healthcare
            solutions that improve <strong style={{ color: 'var(--cyan)' }}>diagnosis</strong>,{' '}
            <strong style={{ color: 'var(--orange)' }}>monitoring</strong>, and{' '}
            <strong style={{ color: '#a855f7' }}>patient care</strong> systems."
          </p>
        </div>

      </div>
    </section>
  );
}
