'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroSection() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted,   setIsMuted]   = useState(true);
  const [loaded,    setLoaded]    = useState(false);

  /* ─── Three.js Particle System ─────────────────────────── */
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas   = canvasRef.current;
    const parent   = canvas.parentElement;
    if (!parent) return;

    const width    = parent.clientWidth || 600;
    const height   = parent.clientHeight || 800;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    /* Particle geometry */
    const COUNT     = 900;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    const colorA = new THREE.Color('#00d4ff');
    const colorB = new THREE.Color('#ff6b35');
    const colorC = new THREE.Color('#7dd3fc');

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const t = Math.random();
      const c = t < 0.5 ? colorA.clone().lerp(colorC, t * 2) : colorC.clone().lerp(colorB, (t - 0.5) * 2);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* Mouse parallax relative to parent pane */
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = (x / rect.width - 0.5) * 2;
      mouse.y = (y / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* Resize */
    const onResize = () => {
      const w = parent.clientWidth || 600;
      const h = parent.clientHeight || 800;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* Animation loop */
    let frame = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      // Slow rotation
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      // Parallax from mouse
      particles.rotation.y += mouse.x * 0.0005;
      particles.rotation.x += mouse.y * 0.0003;

      // Floating wave
      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += Math.sin(frame * 0.01 + i) * 0.0008;
      }
      geo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  /* ─── GSAP Animations (loaded dynamically to avoid SSR issues) ── */
  useEffect(() => {
    let ctx: any;
    const initGSAP = async () => {
      const { gsap }         = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Stagger hero text in
        gsap.fromTo(
          '.hero-badge',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.hero-title',
          { opacity: 0, y: 50, skewX: -2 },
          { opacity: 1, y: 0, skewX: 0, duration: 1.2, delay: 0.6, ease: 'power4.out' }
        );
        gsap.fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.hero-objective',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.hero-cta-row',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, delay: 1.3, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 1.8, ease: 'power2.out' }
        );
        gsap.fromTo(
          '.hero-stats',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power3.out', stagger: 0.1 }
        );
        setLoaded(true);
      }, sectionRef);
    };
    initGSAP();

    // 2-second delay unmuted playback, plays once
    const timer = setTimeout(() => {
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.volume = 1.0; // Ensure 100% volume
        v.loop = false;
        v.play().then(() => {
          setIsMuted(false);
        }).catch(err => {
          console.log("React unmuted autoplay blocked, trying muted:", err);
          v.muted = true;
          setIsMuted(true);
          v.play().catch(e => console.error("React muted play blocked:", e));
        });
      }
    }, 2000);

    return () => {
      ctx?.revert();
      clearTimeout(timer);
    };
  }, []);

  // Automatic unmute on first document-level user gesture (click, key, touch)
  useEffect(() => {
    const handleGesture = () => {
      const v = videoRef.current;
      if (v && v.muted) {
        v.muted = false;
        v.volume = 1.0; // Ensure 100% volume
        setIsMuted(false);
        if (v.paused) {
          v.play().catch(e => console.error(e));
        }
      }
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('click', handleGesture);
      document.removeEventListener('keydown', handleGesture);
      document.removeEventListener('touchstart', handleGesture);
    };

    document.addEventListener('click', handleGesture);
    document.addEventListener('keydown', handleGesture);
    document.addEventListener('touchstart', handleGesture);

    return cleanup;
  }, []);

  /* ─── Video Controls ───────────────────────────────────── */
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().then(() => setIsPlaying(true)); }
    else          { v.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const newMute = !v.muted;
    v.muted = newMute;
    if (!newMute) {
      v.volume = 1.0; // Ensure 100% volume
    }
    setIsMuted(newMute);
  };

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResume = () => {
    document.querySelector('#resume')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-split-container"
    >
      {/* Left Pane - Video */}
      <div className="hero-left-pane cursor-pointer" onClick={toggleMute}>
        <video
          ref={videoRef}
          className="hero-video-split"
          playsInline
          preload="auto"
          poster="/profile.jpg"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
          onCanPlay={() => setLoaded(true)}
        >
          <source src="/video/intro.mp4" type="video/mp4" />
        </video>

        {/* Video Controls (confined inside the left video pane) */}
        <div className="video-controls" style={{ bottom: '20px', right: '20px' }} onClick={(e) => e.stopPropagation()}>
          <button className="video-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            )}
          </button>
          <button className="video-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Right Pane - Content */}
      <div className="hero-right-pane">
        {/* Three.js Canvas */}
        <canvas ref={canvasRef} className="hero-canvas-split" />

        {/* Ambient Overlay for contrast */}
        <div className="hero-right-overlay" />

        {/* Hero Content */}
        <div className="hero-content-split">
          {/* Profile photo block */}
          <div className="hero-badge mb-4 flex items-center gap-4" style={{ opacity: 0 }}>
            <div 
              className="relative overflow-hidden rounded-full border-2 border-cyan/40"
              style={{ width: '90px', height: '90px', boxShadow: 'var(--glow-cyan)', flexShrink: 0 }}
            >
              <img 
                src="/profile.jpg" 
                alt="Vishnu Priya Profile" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-1"
                style={{
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.25)',
                  color: 'var(--cyan)',
                  fontFamily: 'var(--font-mono)',
                  width: 'fit-content'
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }}
                />
                Biomedical Engineering
              </span>
              <span className="text-white/60 text-xs font-mono">Sona College of Technology</span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="hero-title font-display font-bold leading-tight mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              opacity: 0,
            }}
          >
            <span style={{ color: '#fff' }}>Vishnu</span>{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--cyan) 0%, #7dd3fc 50%, var(--orange) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Priya
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--orange)', opacity: 0, fontFamily: 'var(--font-mono)' }}
          >
            Biomedical Engineering Student | AI in Healthcare Enthusiast
          </p>

          {/* Objective */}
          <p
            className="hero-objective text-sm sm:text-base mb-6 leading-relaxed text-white/85"
            style={{ opacity: 0 }}
          >
            Hello, I am Vishnu Priya, a Biomedical Engineering student passionate about healthcare technology, artificial intelligence in medicine, biomedical instrumentation, research, and innovation. Welcome to my portfolio website.
          </p>

          {/* CTAs */}
          <div className="hero-cta-row flex flex-wrap gap-3 mb-10" style={{ opacity: 0 }}>
            <button
              onClick={scrollToAbout}
              className="btn-glass btn-primary text-xs sm:text-sm"
              style={{ fontFamily: 'var(--font-body)', padding: '10px 22px' }}
            >
              View Portfolio
            </button>
            <button
              onClick={scrollToResume}
              className="btn-glass text-xs sm:text-sm"
              style={{ padding: '10px 22px', background: 'rgba(255,255,255,0.02)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-1">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download Resume
            </button>
            <button
              onClick={scrollToContact}
              className="btn-glass text-xs sm:text-sm"
              style={{ padding: '10px 22px', borderColor: 'rgba(0,212,255,0.3)', color: 'var(--cyan)' }}
            >
              Contact Me
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: '8+', label: 'Projects Built' },
              { value: '5+', label: 'Certifications' },
              { value: '2024', label: 'Batch Year' },
            ].map(stat => (
              <div key={stat.label} className="hero-stats" style={{ opacity: 0 }}>
                <div
                  className="text-xl font-bold font-display"
                  style={{
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, var(--cyan), #fff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/40 tracking-wider uppercase mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className="hero-scroll scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2"
        onClick={scrollToAbout}
        style={{ opacity: 0 }}
        aria-label="Scroll to About"
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
          scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, var(--cyan), transparent)',
            margin: '0 auto',
          }}
        />
      </button>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--blue-deep), transparent)', zIndex: 4 }}
      />
    </section>
  );
}
