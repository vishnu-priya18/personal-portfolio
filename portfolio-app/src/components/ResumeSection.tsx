'use client';

import { useEffect, useRef } from 'react';

export default function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo('.resume-preview', { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#resume', start: 'top 80%' },
        });
      }, sectionRef);
      return () => ctx.revert();
    };
    init();
  }, []);

  return (
    <section id="resume" ref={sectionRef} className="section-wrapper bg-blue-deep/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">08 — Curriculum Vitae</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            ATS-Friendly <span style={{ color: 'var(--cyan)' }}>Resume</span>
          </h2>
          <div className="gradient-divider mt-6" />
        </div>

        {/* Resume Preview Box */}
        <div
          className="resume-preview glass-strong max-w-4xl mx-auto rounded-3xl overflow-hidden p-8 md:p-12"
          style={{ opacity: 0, border: '1px solid rgba(0,212,255,0.15)' }}
        >
          {/* Resume Header */}
          <div className="border-b border-white/10 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mb-2">
                VISHNU PRIYA S
              </h3>
              <p className="text-xs md:text-sm font-mono tracking-widest text-cyan uppercase">
                Biomedical Engineering Student & AI Healthcare Innovator
              </p>
            </div>
            <a
              href="/Vishnu_Priya_Resume.pdf"
              download="Vishnu_Priya_Resume.pdf"
              className="btn-glass btn-primary text-xs md:text-sm"
              style={{ padding: '12px 24px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-1">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download PDF Resume
            </a>
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Details, Education, Skills) */}
            <div className="lg:col-span-1 space-y-6 lg:border-r lg:border-white/10 lg:pr-8">
              {/* Contact */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 font-mono">Contact Details</h4>
                <div className="text-xs space-y-2 text-white/70">
                  <p><strong>Email:</strong> <br/><a href="mailto:vishnupriya.24bme@sonatech.ac.in" className="text-cyan hover:underline">vishnupriya.24bme@sonatech.ac.in</a></p>
                  <p><strong>LinkedIn:</strong> <br/><a href="https://www.linkedin.com/in/vishnu-priya-01372931a" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">linkedin.com/in/vishnu-priya...</a></p>
                  <p><strong>GitHub:</strong> <br/><a href="https://github.com/vishnu-priya18" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">github.com/vishnu-priya18</a></p>
                  <p><strong>Location:</strong> <br/>Salem, Tamil Nadu, India</p>
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 font-mono">Education</h4>
                <div className="space-y-4 text-xs">
                  <div>
                    <p className="font-bold text-white">B.E. Biomedical Engineering</p>
                    <p className="text-cyan font-semibold">Sona College of Technology</p>
                    <p className="text-white/40 font-mono">2024 – 2028 | Salem, TN</p>
                  </div>
                  <div>
                    <p className="font-bold text-white">12th Grade (HSC)</p>
                    <p className="text-cyan font-semibold">Saraswati Matric School</p>
                    <p className="text-white/40 font-mono">Year: 2022 | Score: 74.6%</p>
                  </div>
                  <div>
                    <p className="font-bold text-white">10th Grade (SSLC)</p>
                    <p className="text-cyan font-semibold">Govt Girls School, Belur</p>
                    <p className="text-white/40 font-mono">Year: 2021</p>
                  </div>
                </div>
              </div>

              {/* Core Skills */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 font-mono">Core Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['Biomedical Instrumentation', 'Medical Electronics', 'AI Tools', 'Medical Coding', 'Canva', 'Microsoft Office', 'Python', 'C Programming', 'C++', 'HTML'].map(skill => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/80 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Career Objective, Experience, Projects, Certifications) */}
            <div className="lg:col-span-2 space-y-6 lg:pl-4">
              {/* Career Objective */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2.5 font-mono">Career Objective</h4>
                <p className="text-xs leading-relaxed text-white/80">
                  Dedicated and analytical Biomedical Engineering student at Sona College of Technology, seeking to integrate cutting-edge technologies like Artificial Intelligence (AI) and Internet of Things (IoT) with clinical medicine. Passionate about building smart medical diagnostics, wearables, and instrumentation systems that improve diagnostic accuracy and enhance healthcare workflows.
                </p>
              </div>

              {/* Internships */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 font-mono">Internship</h4>
                <div className="border-l-2 border-cyan/40 pl-4 space-y-1">
                  <div className="flex justify-between items-start flex-wrap gap-2 text-xs">
                    <strong className="text-white">Healthcare Technology Intern</strong>
                    <span className="text-cyan font-semibold font-mono">Medsby | Completed</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-white/60">
                    <li>Gained hands-on experience with diagnostic and physiological patient monitoring systems.</li>
                    <li>Studied clinical device integration pipelines, from biological signal capture to software visualization.</li>
                    <li>Collaborated on conceptual models connecting physical engineering and medical diagnostics.</li>
                  </ul>
                </div>
              </div>

              {/* Selected Projects */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 font-mono">Academic Projects</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start text-xs">
                      <strong className="text-white">Smart AI-Powered Stethoscope</strong>
                      <span className="text-cyan font-mono">AI, Biomedical, ML</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      Designed a smart digital stethoscope system integrating machine learning algorithms to analyze physiological body sounds and classify potential cardiac anomalies.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start text-xs">
                      <strong className="text-white">AI-Based Drowsiness Detection System</strong>
                      <span className="text-cyan font-mono">Computer Vision, OpenCV, Arduino</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      Built a real-time driver sleepiness warning interface combining OpenCV, face detection landmarks, and alert triggers.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start text-xs">
                      <strong className="text-white">Pulse Oximeter using ESP32</strong>
                      <span className="text-cyan font-mono">ESP32, IoT Cloud, Sensors</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      Developed a portable, cloud-synced health band transmitting continuous blood oxygen (SpO₂) and heart rate sensor values to a dashboard.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 font-mono">Key Certifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-white/70">
                  <p>✓ <strong>Design Thinking (Silver + Elite - 78%)</strong> — NPTEL (IIT)</p>
                  <p>✓ <strong>Cardiovascular Mechanics (Elite - 68%)</strong> — NPTEL (IIT)</p>
                  <p>✓ <strong>Software Development Using Python</strong> — IMIC Centre</p>
                  <p>✓ <strong>Digital Skills & Python Basics</strong> — FutureSkills Prime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
