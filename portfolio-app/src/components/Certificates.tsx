'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Tab = 'nptel' | 'course' | 'achievement';

// ─── Certificate data mapped to /public/certs/ folders ───────────
const nptelCerts = [
  {
    title: 'Design Thinking',
    subtitle: 'Silver + Elite',
    score: '78%',
    provider: 'NPTEL — IIT',
    image: '/certs/nptel/nptel_certificate.jpg',
    badge: '🥈',
    badgeColor: '#C0C0C0',
  },
  {
    title: 'Introduction to Cardiovascular Mechanics',
    subtitle: 'Elite',
    score: '68%',
    provider: 'NPTEL — IIT',
    image: '/certs/nptel/nptel_certificate.jpg',
    badge: '⭐',
    badgeColor: '#FFD700',
  },
];

const courseCerts = [
  {
    title: 'Software Development Using Python',
    provider: 'IMIC',
    image: '/certs/course/python_course_cert.jpg',
    tag: 'Python',
  },
  {
    title: 'Digital Skills & Python Basics',
    provider: 'FutureSkills Prime',
    image: '/certs/course/FutureSkills_20260328_055205_0000.png',
    tag: 'Digital Skills',
  },
  {
    title: 'FutureSkills Course Completion',
    provider: 'FutureSkills Prime',
    image: '/certs/course/FutureSkills_20260328_055206_0001.png',
    tag: 'Digital Skills',
  },
  {
    title: 'Online Course Certification',
    provider: 'Online Platform',
    image: '/certs/course/IMG_20260329_074817.jpg',
    tag: 'Technical',
  },
];

// Achievement certs (all JPGs/PNGs in achievement folder)
const achievementCerts = [
  { title: 'Academic Excellence Award', image: '/certs/achievement/8122914088_cert.jpg' },
  { title: 'Vishnu Priya S. Achievement', image: '/certs/achievement/vishnu_priya_cert.png' },
  { title: 'Biomedical Workshop Participation', image: '/certs/achievement/IMG_20260531_161113.jpg' },
  { title: 'Technical Event Recognition', image: '/certs/achievement/IMG_20260531_161135.jpg' },
  { title: 'Engineering Day Presentation', image: '/certs/achievement/IMG_20260531_161153.jpg' },
  { title: 'Medical Coding Seminar', image: '/certs/achievement/IMG_20260531_161207.jpg' },
  { title: 'Healthcare Hackathon Participant', image: '/certs/achievement/IMG_20260531_161221.jpg' },
  { title: 'Biosensors Workshop Certificate', image: '/certs/achievement/IMG_20260531_161241.jpg' },
  { title: 'Clinical Training Completion', image: '/certs/achievement/IMG_20260531_161301.jpg' },
  { title: 'Technical Quiz Competition', image: '/certs/achievement/IMG_20260531_161317.jpg' },
  { title: 'Symposium Presenter Certificate', image: '/certs/achievement/IMG_20260531_161338.jpg' },
  { title: 'National Level Conference Delegate', image: '/certs/achievement/IMG_20260531_161352.jpg' },
  { title: 'Biomedical Instrumentation Training', image: '/certs/achievement/IMG_20260531_161406.jpg' },
  { title: 'College Event Certificate 1', image: '/certs/achievement/event_cert_01.jpeg' },
  { title: 'College Event Certificate 2', image: '/certs/achievement/event_cert_02.jpeg' },
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('nptel');
  const [lightbox, setLightbox]   = useState<string | null>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo('.cert-section', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#certificates', start: 'top 80%' },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    initGSAP();
  }, []);

  // Re-animate cards when tab changes
  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap');
      gsap.fromTo('.cert-card', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
      });
    };
    animate();
  }, [activeTab]);

  const tabs: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: 'nptel',       label: 'NPTEL',         icon: '🏛️', count: nptelCerts.length },
    { id: 'course',      label: 'Courses',        icon: '📜', count: courseCerts.length },
    { id: 'achievement', label: 'Achievements',   icon: '🏅', count: achievementCerts.length },
  ];

  return (
    <section id="certificates" ref={sectionRef} className="section-wrapper">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 70%, rgba(251,191,36,0.04), transparent)',
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="cert-section text-center mb-16" style={{ opacity: 0 }}>
          <p className="section-label mb-3">07 — Certificates</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Credentials & <span style={{ color: '#f59e0b' }}>Recognition</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            A curated collection of certifications, achievements, and recognitions that mark my learning journey.
          </p>
          <div className="gradient-divider mt-8" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: activeTab === tab.id ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.08)',
                  color: activeTab === tab.id ? 'var(--cyan)' : 'rgba(255,255,255,0.4)',
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── NPTEL Tab ──────────────────────────── */}
        {activeTab === 'nptel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {nptelCerts.map((cert, i) => (
              <div
                key={i}
                className="cert-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                }}
                onClick={() => setLightbox(cert.image)}
              >
                <div className="relative h-48">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, transparent 60%)' }}
                  />
                  {/* Badge overlay */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${cert.badgeColor}20`,
                        border: `1px solid ${cert.badgeColor}40`,
                        color: cert.badgeColor,
                      }}
                    >
                      {cert.badge} {cert.subtitle}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-white/90 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    {cert.title}
                  </h4>
                  <p className="text-xs text-white/40 mb-3">{cert.provider}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Score</span>
                    <span
                      className="text-sm font-bold"
                      style={{
                        background: 'linear-gradient(135deg, var(--cyan), #22c55e)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {cert.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Course Completion Tab ──────────────── */}
        {activeTab === 'course' && (
          <div>
            {/* Course labels */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Digital 101', 'Data Acquisition', 'Python Basics', 'Freelancing', 'Prompt Engineering'].map(c => (
                <span
                  key={c}
                  className="px-4 py-2 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    color: 'var(--cyan)',
                  }}
                >
                  ✓ {c}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {courseCerts.map((cert, i) => (
                <div
                  key={i}
                  className="cert-card"
                  onClick={() => setLightbox(cert.image)}
                >
                  <div className="relative h-40">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.8), transparent 50%)' }} />
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs"
                      style={{ background: 'rgba(0,212,255,0.2)', color: 'var(--cyan)', border: '1px solid rgba(0,212,255,0.3)' }}
                    >
                      {cert.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-xs text-white/80 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {cert.title}
                    </h4>
                    <p className="text-xs text-white/35">{cert.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Achievement Tab ────────────────────── */}
        {activeTab === 'achievement' && (
          <div>
            <p className="text-center text-white/40 text-sm mb-8">
              College-level event participations, recognition certificates, and achievement awards.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {achievementCerts.map((cert, i) => (
                <div
                  key={i}
                  className="cert-card aspect-[3/4] relative"
                  onClick={() => setLightbox(cert.image)}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.75), transparent 50%)' }} />
                  <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/60 px-2">
                    {cert.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            ✕
          </button>
          <div className="relative" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
            <Image
              src={lightbox}
              alt="Certificate"
              width={900}
              height={700}
              style={{ objectFit: 'contain', borderRadius: '12px', maxWidth: '90vw', maxHeight: '85vh' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
