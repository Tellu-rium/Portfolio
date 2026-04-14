import React, { useEffect, useRef } from 'react';

const Portfolio = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Custom Cursor Logic
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let reqId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      reqId = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMouseMove);
    animateRing();

    // Cursor Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .group');
    const handleMouseEnter = () => {
      if (cursor && ring) {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.opacity = '0.2';
      }
    };
    const handleMouseLeave = () => {
      if (cursor && ring) {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '0.4';
      }
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Scroll Reveal Logic
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('opacity-0', 'translate-y-8');
            e.target.classList.add('!opacity-100', '!translate-y-0');
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    // Skill Bars Logic
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const w = parseFloat(e.target.dataset.width);
            e.target.style.transform = `scaleX(${w})`;
          }
        });
      },
      { threshold: 0.3 }
    );
    skillBars.forEach((bar) => skillObserver.observe(bar));

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(reqId);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      reveals.forEach((el) => revealObserver.unobserve(el));
      skillBars.forEach((bar) => skillObserver.unobserve(bar));
    };
  }, []);

  return (
    <div className="bg-paper text-ink font-mono text-[13px] leading-[1.7] overflow-x-hidden cursor-none group min-h-screen">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-60 mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E')]"></div>

      {/* Cursor Elements */}
      <div ref={cursorRef} className="fixed w-[10px] h-[10px] bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] duration-200 mix-blend-multiply opacity-0 group-hover:opacity-100"></div>
      <div ref={ringRef} className="fixed w-[36px] h-[36px] border border-ink rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[transform,width,height,opacity] duration-[0.12s,0.2s,0.2s,0.2s] ease-out opacity-40 group-hover:opacity-40"></div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md bg-paper/85 border-b border-border">
        <div className="font-syne font-extrabold text-base tracking-[0.1em] uppercase">S·M</div>
        <nav className="flex gap-6 md:gap-10 items-center">
          <a href="#about" className="no-underline text-muted text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-ink relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full">About</a>
          <a href="#work" className="no-underline text-muted text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-ink relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full">Work</a>
          <a href="#contact" className="no-underline text-muted text-[11px] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-ink relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full">Contact</a>
          <a href="mailto:sumeet@example.com" className="px-5 py-2 border border-ink !text-ink text-[11px] tracking-[0.08em] uppercase transition-colors duration-200 hover:bg-ink hover:!text-paper">Hire me</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-32 pb-16 relative overflow-hidden" id="home">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,15,14,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,15,14,0.12)_1px,transparent_1px)] bg-[length:80px_80px] opacity-40 pointer-events-none"></div>
        <span className="absolute text-[9px] tracking-[0.15em] text-muted opacity-50 top-4 left-4">43.8°N</span>
        <span className="absolute text-[9px] tracking-[0.15em] text-muted opacity-50 top-4 right-4">2025</span>
        <span className="absolute text-[9px] tracking-[0.15em] text-muted opacity-50 bottom-4 left-4">Portfolio</span>
        <span className="absolute text-[9px] tracking-[0.15em] text-muted opacity-50 bottom-4 right-4">v1.0</span>

        <div className="text-[10px] tracking-[0.25em] uppercase text-muted mb-12 flex items-center gap-4 opacity-0 animate-[fadeUp_0.8s_0.2s_forwards] before:w-10 before:h-px before:bg-muted after:w-10 after:h-px after:bg-muted">Designer &amp; Developer</div>

        <div className="relative w-[min(560px,88vw)] opacity-0 animate-[fadeUp_1s_0.4s_forwards]">
          <img src="/logo.svg" alt="Sumeet" className="w-full h-auto block mix-blend-multiply contrast-105" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent animate-[lineExpand_1s_1.2s_forwards]"></div>
        </div>

        <p className="mt-12 font-serif text-[clamp(1.1rem,2.5vw,1.45rem)] italic font-light text-muted text-center max-w-[480px] leading-[1.6] opacity-0 animate-[fadeUp_0.8s_0.9s_forwards]">
          Crafting digital experiences that live at the intersection of <em className="text-accent">form</em> and <em className="text-accent">function</em>
        </p>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-[10px] tracking-[0.2em] uppercase opacity-0 animate-[fadeUp_0.8s_1.6s_forwards]">
          <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent animate-scrollPulse"></div>
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border py-5 bg-warm">
        <div className="flex gap-16 animate-marquee w-max">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="font-syne font-bold text-[0.85rem] tracking-[0.2em] uppercase text-muted whitespace-nowrap flex items-center gap-8">UI Design <span className="w-1 h-1 rounded-full bg-accent inline-block"></span></div>
              <div className="font-syne font-bold text-[0.85rem] tracking-[0.2em] uppercase text-muted whitespace-nowrap flex items-center gap-8">Full-Stack Dev <span className="w-1 h-1 rounded-full bg-accent inline-block"></span></div>
              <div className="font-syne font-bold text-[0.85rem] tracking-[0.2em] uppercase text-muted whitespace-nowrap flex items-center gap-8">Machine Learning <span className="w-1 h-1 rounded-full bg-accent inline-block"></span></div>
              <div className="font-syne font-bold text-[0.85rem] tracking-[0.2em] uppercase text-muted whitespace-nowrap flex items-center gap-8">Creative Coding <span className="w-1 h-1 rounded-full bg-accent inline-block"></span></div>
              <div className="font-syne font-bold text-[0.85rem] tracking-[0.2em] uppercase text-muted whitespace-nowrap flex items-center gap-8">Systems Thinking <span className="w-1 h-1 rounded-full bg-accent inline-block"></span></div>
              <div className="font-syne font-bold text-[0.85rem] tracking-[0.2em] uppercase text-muted whitespace-nowrap flex items-center gap-8">Open to Work <span className="w-1 h-1 rounded-full bg-accent inline-block"></span></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 md:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start max-w-[1200px] mx-auto">
          <div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3 before:content-[attr(data-num)] before:text-[9px] before:text-muted before:opacity-60 reveal opacity-0 translate-y-8 transition-all duration-[900ms] ease-out" data-num="01">About</div>
            <h2 className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-12 reveal delay-100 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
              Building things<br />that matter
            </h2>
            <p className="font-serif text-[1.3rem] font-light leading-[1.75] text-ink mb-8 reveal delay-200 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
              I'm Sumeet — a developer and designer passionate about creating <em className="not-italic italic text-accent">thoughtful, well-crafted</em> digital products. I bridge the gap between clean engineering and intentional design.
            </p>
            <p className="font-serif text-[1.3rem] font-light leading-[1.75] text-ink mb-8 reveal delay-300 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
              Currently exploring machine learning applications, control systems, and building tools that solve real problems elegantly.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10 reveal delay-[400ms] opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
              <div className="border-t border-border pt-4">
                <div className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1.5">Based in</div>
                <div className="text-[0.9rem] text-ink">India</div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1.5">Focus</div>
                <div className="text-[0.9rem] text-ink">Engineering & Design</div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1.5">Status</div>
                <div className="text-[0.9rem] text-accent">● Available</div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1.5">Experience</div>
                <div className="text-[0.9rem] text-ink">3+ Years</div>
              </div>
            </div>
          </div>

          <div className="reveal delay-300 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
            <div className="font-syne font-semibold text-[0.85rem] tracking-[0.05em] mb-6 uppercase">Technical Skills</div>
            
            {[
              { name: 'Python / ML', value: '0.88' },
              { name: 'React / Next.js', value: '0.85' },
              { name: 'MATLAB / Simulink', value: '0.80' },
              { name: 'Node.js', value: '0.75' },
              { name: 'UI / UX Design', value: '0.82' },
              { name: 'C / C++', value: '0.70' }
            ].map((skill, index) => (
              <div key={index} className="flex justify-between items-center py-3.5 border-b border-border relative">
                <span className="text-[0.85rem] text-ink">{skill.name}</span>
                <div className="w-[120px] h-[2px] bg-warm relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-ink origin-left scale-x-0 transition-transform duration-1000 ease-out skill-bar" data-width={skill.value}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="bg-ink text-paper py-28 px-6 md:px-12 relative">
        <div className="max-w-[1200px] mx-auto mb-16 reveal opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
          <div className="text-[9px] tracking-[0.3em] uppercase text-accent mb-4 flex items-center gap-3 before:content-[attr(data-num)] before:text-[9px] before:text-muted before:opacity-60" data-num="02">Selected Work</div>
          <h2 className="font-syne font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-12 text-paper">Things I've<br />built</h2>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {/* Project Cards */}
          <div className="relative p-8 md:p-12 border border-paper/10 bg-paper/5 transition-colors duration-300 overflow-hidden cursor-none hover:bg-paper/10 group reveal delay-100 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out before:absolute before:inset-0 before:bg-accent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-[0.04] before:pointer-events-none">
            <div className="absolute top-8 right-8 w-8 h-8 border border-paper/15 flex items-center justify-center text-paper/30 text-[14px] -rotate-45 transition-all duration-300 group-hover:rotate-0 group-hover:text-paper group-hover:border-paper/40">→</div>
            <div className="text-[9px] tracking-[0.2em] text-paper/30 mb-12">01 — 2025</div>
            <div className="font-syne font-bold text-[1.6rem] tracking-[-0.02em] text-paper mb-4 leading-[1.1]">Adaptive PI Controller</div>
            <p className="text-[0.8rem] text-paper/50 leading-[1.7] mb-8">ML-based gain tuning for engine RPM control. Neural network predicts correction factors for a PI controller responding to disturbance inputs — built for Caterpillar hackathon.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">Python</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">MATLAB</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">Simulink</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">scikit-learn</span>
            </div>
          </div>

          <div className="relative p-8 md:p-12 border border-paper/10 bg-paper/5 transition-colors duration-300 overflow-hidden cursor-none hover:bg-paper/10 group reveal delay-200 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out before:absolute before:inset-0 before:bg-accent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-[0.04] before:pointer-events-none">
            <div className="absolute top-8 right-8 w-8 h-8 border border-paper/15 flex items-center justify-center text-paper/30 text-[14px] -rotate-45 transition-all duration-300 group-hover:rotate-0 group-hover:text-paper group-hover:border-paper/40">→</div>
            <div className="text-[9px] tracking-[0.2em] text-paper/30 mb-12">02 — 2024</div>
            <div className="font-syne font-bold text-[1.6rem] tracking-[-0.02em] text-paper mb-4 leading-[1.1]">Design System</div>
            <p className="text-[0.8rem] text-paper/50 leading-[1.7] mb-8">A comprehensive component library built from scratch — tokens, primitives, and patterns. Covers typography, color, spacing, and interaction states for a cohesive product language.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">React</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">TypeScript</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">Figma</span>
            </div>
          </div>

          <div className="relative p-8 md:p-12 border border-paper/10 bg-paper/5 transition-colors duration-300 overflow-hidden cursor-none hover:bg-paper/10 group reveal delay-300 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out before:absolute before:inset-0 before:bg-accent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-[0.04] before:pointer-events-none">
            <div className="absolute top-8 right-8 w-8 h-8 border border-paper/15 flex items-center justify-center text-paper/30 text-[14px] -rotate-45 transition-all duration-300 group-hover:rotate-0 group-hover:text-paper group-hover:border-paper/40">→</div>
            <div className="text-[9px] tracking-[0.2em] text-paper/30 mb-12">03 — 2024</div>
            <div className="font-syne font-bold text-[1.6rem] tracking-[-0.02em] text-paper mb-4 leading-[1.1]">Data Visualizer</div>
            <p className="text-[0.8rem] text-paper/50 leading-[1.7] mb-8">Interactive dashboard for exploring large datasets with real-time filtering, drill-down views, and exportable charts. Built with a focus on performance at scale.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">Next.js</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">D3.js</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">PostgreSQL</span>
            </div>
          </div>

          <div className="relative p-8 md:p-12 border border-paper/10 bg-paper/5 transition-colors duration-300 overflow-hidden cursor-none hover:bg-paper/10 group reveal delay-[400ms] opacity-0 translate-y-8 transition-all duration-[900ms] ease-out before:absolute before:inset-0 before:bg-accent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-[0.04] before:pointer-events-none">
            <div className="absolute top-8 right-8 w-8 h-8 border border-paper/15 flex items-center justify-center text-paper/30 text-[14px] -rotate-45 transition-all duration-300 group-hover:rotate-0 group-hover:text-paper group-hover:border-paper/40">→</div>
            <div className="text-[9px] tracking-[0.2em] text-paper/30 mb-12">04 — 2023</div>
            <div className="font-syne font-bold text-[1.6rem] tracking-[-0.02em] text-paper mb-4 leading-[1.1]">Open Source CLI</div>
            <p className="text-[0.8rem] text-paper/50 leading-[1.7] mb-8">A developer productivity tool that automates repetitive workflows. 200+ GitHub stars. Includes plugin architecture, colored output, and cross-platform support.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">Node.js</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">Shell</span>
              <span className="text-[9px] tracking-[0.12em] uppercase px-3 py-1 border border-paper/15 text-paper/50">Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* WIDE LOGO DIVIDER */}
      <div className="w-full overflow-hidden relative bg-warm border-y border-border py-8" aria-hidden="true">
        <div className="flex gap-0 animate-dividerScroll w-max items-center">
          {[...Array(4)].map((_, i) => (
            <img key={i} src="/logo2.svg" alt="" className="h-[120px] w-auto mix-blend-multiply contrast-[0.85] opacity-45 shrink-0 block" />
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden py-28 px-6 md:px-12">
        <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[120%] max-w-[1400px] pointer-events-none z-0" aria-hidden="true">
          <img src="/logo2.svg" alt="" className="w-full h-auto block mix-blend-multiply contrast-60 opacity-5" />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <h2 className="font-syne font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] reveal opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
              Let's<br /><span className="text-accent italic font-serif font-light">work</span><br />together
            </h2>
          </div>

          <div>
            <p className="font-serif text-[1.2rem] font-light leading-[1.7] text-muted mb-10 reveal delay-100 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
              I'm open to freelance projects, full-time roles, and interesting collaborations. If you have something in mind, let's talk.
            </p>

            <div className="flex flex-col gap-4 reveal delay-200 opacity-0 translate-y-8 transition-all duration-[900ms] ease-out">
              <a href="mailto:sumeet@example.com" className="flex items-center gap-4 no-underline text-ink py-4 border-t border-border transition-[gap] duration-300 text-[0.85rem] hover:gap-6 group">
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted min-w-[80px]">Email</span>
                <span className="text-ink">sumeet@example.com</span>
                <span className="ml-auto text-muted transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a href="#" className="flex items-center gap-4 no-underline text-ink py-4 border-t border-border transition-[gap] duration-300 text-[0.85rem] hover:gap-6 group">
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted min-w-[80px]">LinkedIn</span>
                <span className="text-ink">linkedin.com/in/sumeet</span>
                <span className="ml-auto text-muted transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a href="#" className="flex items-center gap-4 no-underline text-ink py-4 border-t border-border transition-[gap] duration-300 text-[0.85rem] hover:gap-6 group">
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted min-w-[80px]">GitHub</span>
                <span className="text-ink">github.com/sumeet</span>
                <span className="ml-auto text-muted transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a href="#" className="flex items-center gap-4 no-underline text-ink py-4 border-t border-border transition-[gap] duration-300 text-[0.85rem] hover:gap-6 group">
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted min-w-[80px]">Twitter</span>
                <span className="text-ink">@sumeet</span>
                <span className="ml-auto text-muted transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 text-[10px] tracking-[0.12em] text-muted uppercase text-center">
        <span>© 2025 Sumeet</span>
        <span>Designed &amp; built with intention</span>
        <span>India</span>
      </footer>

    </div>
  );
};

export default Portfolio;