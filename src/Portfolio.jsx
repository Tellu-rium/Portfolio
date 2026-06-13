import { useEffect, useRef, useState } from "react";
import "./index.css";
import Profile from "./assets/Profile.png"; 
import logo from "./assets/logo2.png";
import { BLOGS_LIST } from "./blogpost";

const SKILLS = [
  { name: "Verilog / VHDL",       width: 0.88 },
  { name: "React / Next.js",      width: 0.85 },
  { name: "MATLAB / Simulink",    width: 0.80 },
  { name: "Python / C",           width: 0.75 },
  { name: "UI / UX Design",       width: 0.82 },
];

const PROJECTS = [
  {
    num: "03 — 2026",
    name: "Adaptive PI Controller",
    desc: "ML-based gain tuning for engine RPM control. Neural network predicts correction factors for a PI controller responding to disturbance inputs — built for Caterpillar hackathon.",
    tags: ["MATLAB", "Simulink", "Reinforcement Learning"],
    category: "ECE"
  },
  {
    num: "01 — 2026",
    name: "Aurora Website",
    desc: "Made a website for our college's largest individual clubs event Aurora, contributed in both frontend and backend, implemented interactive features.",
    tags: ["React", "JavaScript", "Node.js"],
    category: "CS"
  },
  {
    num: "09 — 2025",
    name: "Acumen",
    desc: "Made a lot of React based games and pages for the most participated online college event- Acumen, Hopeless Opus, a story and choice based interactive game.",
    tags: ["JavaScript", "React", "MongoDB"],
    category: "CS"
  },
  {
    num: "04 — 2026",
    name: "MISP32 RISC-V CPU",
    desc: "Developed a RISC-V CPU in Verilog. Currently working on implementing a 5-stage pipeline and RTL to GDSII flow. Also exploring VHDL for FPGA prototyping.",
    tags: ["Verilog", "VHDL", "FPGA"],
    category: "ECE"
  },
];

const EXPERIENCES = [
  {
    role: "VLSI & Hardware Design Intern",
    company: "Government Research Facility",
    timeline: "Summer 2026",
    desc: "Worked on a SoM and implemented PS-PL logic communication using AXI protocol, gained hands-on experience with Vivado, Vitis and FPGA development. Stored the data in DDR and implemented a custom protocol for data transfer between PS and PL.",
    tags: ["VHDL", "Vivado", "Vitis", "Krea SoM"]
  }
];

const MARQUEE_ITEMS = [
  "I think Capacitors and MOSFETs rule the world", 
  "My favorite circuit is CMOS Inverter", 
  "yk Ring oscillators are like thermometer for silicon speed"
];

function CustomCursor({ isLight }) {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const ring      = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      document.body.style.cursor = "auto";
      return;
    }

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top  = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const grow = (el) => {
      el.addEventListener("mouseenter", () => {
        if (!cursorRef.current || !ringRef.current) return;
        ringRef.current.style.width    = "45px";
        ringRef.current.style.height   = "45px";
        ringRef.current.style.backgroundColor = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
      });
      el.addEventListener("mouseleave", () => {
        if (!cursorRef.current || !ringRef.current) return;
        ringRef.current.style.width    = "30px";
        ringRef.current.style.height   = "30px";
        ringRef.current.style.backgroundColor = "transparent";
      });
    };
    
    document.querySelectorAll("a, button, .project-card, .hover-target").forEach(grow);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isLight]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`hidden md:block fixed w-[8px] h-[8px] rounded-full pointer-events-none z-[9999] ${isLight ? 'bg-black' : 'bg-white mix-blend-difference'}`}
        style={{ transform: "translate(-50%,-50%)", transition: "width .2s, height .2s, background-color 0.3s" }}
      />
      <div
        ref={ringRef}
        className={`hidden md:block fixed w-[30px] h-[30px] rounded-full pointer-events-none z-[9998] border opacity-60 ${isLight ? 'border-black' : 'border-white mix-blend-difference'}`}
        style={{ transform: "translate(-50%,-50%)", transition: "width .2s, height .2s, background-color .2s, border-color 0.3s" }}
      />
    </>
  );
}

function ThemeButton({ isLight, setIsLight }) {
  const handleToggle = (e) => {
    if (!document.startViewTransition) {
      if (!isLight) document.body.classList.add('light');
      else document.body.classList.remove('light');
      setIsLight(!isLight);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      if (!isLight) {
        document.body.classList.add('light');
      } else {
        document.body.classList.remove('light');
      }
      
      setIsLight(!isLight);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center w-7 h-7 ml-2 md:ml-3 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none hover-target shadow-sm ${
        isLight ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      title="Toggle Theme"
    >
      {isLight ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      )}
    </button>
  );
}

function Header({ setCurrentPage, isLight, setIsLight }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (page, hash = "") => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-12 py-4 md:py-6">
        <div 
          onClick={() => navigateTo("home")}
          className={`${isLight ? 'text-black' : 'text-white'} px-3 md:px-4 py-1 text-xl md:text-3xl font-anton tracking-wide hover-target relative z-50 cursor-pointer transition-colors duration-500`}
        >
          SM
        </div>
        
        <nav className={`hidden md:flex gap-8 ${isLight ? 'text-black/70' : 'text-white/70'} font-bold text-[13px] tracking-wider uppercase drop-shadow-md items-center transition-colors duration-500`}>
          <button onClick={() => navigateTo("home")} className={`hover:${isLight ? 'text-black' : 'text-white'} transition-colors hover-target uppercase tracking-wider`}>Home</button>
          <button onClick={() => navigateTo("home", "#about")} className={`hover:${isLight ? 'text-black' : 'text-white'} transition-colors hover-target uppercase tracking-wider`}>About</button>
          <button onClick={() => navigateTo("home", "#work")} className={`hover:${isLight ? 'text-black' : 'text-white'} transition-colors hover-target uppercase tracking-wider`}>Projects</button>
          <button onClick={() => navigateTo("home", "#experience")} className={`hover:${isLight ? 'text-black' : 'text-white'} transition-colors hover-target uppercase tracking-wider`}>Experience</button>
          <button onClick={() => navigateTo("blog")} className={`hover:${isLight ? 'text-black' : 'text-white'} transition-colors hover-target uppercase tracking-wider`}>Blog</button>
          <button onClick={() => navigateTo("home", "#contact")} className={`hover:${isLight ? 'text-black' : 'text-white'} transition-colors hover-target uppercase tracking-wider`}>Contact</button>
          <a href="mailto:officialsumeet22@gmail.com" className={`hover:${isLight ? 'text-black' : 'text-white'} transition-colors hover-target`}>
            Hire me
          </a>
          
          <ThemeButton isLight={isLight} setIsLight={setIsLight} />
        </nav>

        <div className="md:hidden flex items-center gap-4 relative z-50">
          <ThemeButton isLight={isLight} setIsLight={setIsLight} />
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover-target focus:outline-none">
            <div className="flex flex-col gap-1.5 w-7">
              <span className={`block h-[2px] ${isLight ? 'bg-black' : 'bg-white'} transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
              <span className={`block h-[2px] ${isLight ? 'bg-black' : 'bg-white'} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-[2px] ${isLight ? 'bg-black' : 'bg-white'} transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 ${isLight ? 'bg-white/95' : 'bg-black/95'} backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className={`flex flex-col items-center gap-8 ${isLight ? 'text-black' : 'text-white'} font-anton text-3xl tracking-widest uppercase transition-colors duration-500`}>
          <button onClick={() => navigateTo("home")} className={`hover:${isLight ? 'text-black/60' : 'text-white/60'} transition-colors uppercase`}>Home</button>
          <button onClick={() => navigateTo("home", "#about")} className={`hover:${isLight ? 'text-black/60' : 'text-white/60'} transition-colors uppercase`}>About</button>
          <button onClick={() => navigateTo("home", "#work")} className={`hover:${isLight ? 'text-black/60' : 'text-white/60'} transition-colors uppercase`}>Projects</button>
          <button onClick={() => navigateTo("home", "#experience")} className={`hover:${isLight ? 'text-black/60' : 'text-white/60'} transition-colors uppercase`}>Experience</button>
          <button onClick={() => navigateTo("blog")} className={`hover:${isLight ? 'text-black/60' : 'text-white/60'} transition-colors uppercase`}>Blog</button>
          <button onClick={() => navigateTo("home", "#contact")} className={`hover:${isLight ? 'text-black/60' : 'text-white/60'} transition-colors uppercase`}>Contact</button>
          <a href="mailto:officialsumeet22@gmail.com" onClick={() => setIsMenuOpen(false)} className={`mt-4 text-xl border ${isLight ? 'border-black hover:bg-black hover:text-white' : 'border-white hover:bg-white hover:text-black'} px-8 py-3 transition-all`}>
            Hire me
          </a>
        </nav>
      </div>
    </>
  );
}

function Hero({ isLight }) {
  return (
    <section className="relative w-full h-[90vh] md:h-screen flex flex-col justify-end items-center overflow-hidden">
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 whitespace-nowrap pointer-events-none">
        <h1 className="giant-bg-text m-0 select-none opacity-90" style={{ fontSize: 'clamp(4.5rem, 26vw, 45rem)' }}>SUMEET</h1>
      </div>

      <div className="relative z-20 w-full max-w-[900px] h-[75vh] md:h-[85vh] flex justify-center items-end pointer-events-none">
        <img 
          src={Profile} 
          alt="Sumeet" 
          className="w-auto h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        />
      </div>
        
      <div className={`absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t ${isLight ? 'from-white via-white/50' : 'from-black via-black/50'} to-transparent z-30 pointer-events-none transition-colors duration-500`} />
    </section>
  );
}

function Marquee({ isLight }) {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className={`overflow-hidden py-3 md:py-5 ${isLight ? 'bg-white' : 'bg-black'} bg-opacity-80 backdrop-blur-md border-t border-b border-[var(--glass-border)] relative z-30 hover-target transition-colors duration-500`}>
      <div className="marquee-anim flex gap-8 md:gap-16 w-max">
        {doubled.map((item, i) => (
          <div key={i} className={`font-anton text-lg md:text-2xl tracking-wide whitespace-nowrap flex items-center gap-6 md:gap-8 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
            {item}
            <span className={`inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isLight ? 'bg-black' : 'bg-white'} opacity-50`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function About({ isLight }) {
  return (
    <section id="about" className="relative z-20 py-16 md:py-28 px-4 md:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-start">
        
        <div className="p-6 md:p-10 bg-[var(--glass-panel)] backdrop-blur-md border border-[var(--glass-border)] rounded-xl hover-target transition-colors duration-500">
          <div className={`reveal font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 ${isLight ? 'text-black/50' : 'text-white/50'} drop-shadow-md`}>
            01 — About
          </div>
          <h2 className={`reveal font-anton text-3xl sm:text-4xl md:text-6xl leading-[1.05] mb-6 md:mb-8 ${isLight ? 'text-black' : 'text-white'} tracking-wide transition-colors duration-500`}>
            BUILDING THINGS<br />THAT MATTER
          </h2>
          <p className={`reveal text-base md:text-xl leading-relaxed mb-6 font-medium ${isLight ? 'text-black/80' : 'text-white/80'} transition-colors duration-500`} style={{ transitionDelay: "0.2s" }}>
            Lemme introduce myself, I am Sumeet a passionate thinker <em className={`${isLight ? 'text-black' : 'text-white'} font-bold not-italic transition-colors duration-500`}>who's figuring out his genuine interests.</em> Till now I love Digital Design and Making random websites, I am open to exploring new fields and learning new things.
          </p>
          <p className={`reveal text-base md:text-xl leading-relaxed font-medium ${isLight ? 'text-black/80' : 'text-white/80'} transition-colors duration-500`} style={{ transitionDelay: "0.3s" }}>
            Currently exploring Digital VLSI, doing VHDL, and studying Douglas Perry's VHDL.
          </p>

          <div className={`reveal grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10 pt-6 border-t ${isLight ? 'border-black/20' : 'border-white/20'} transition-colors duration-500`} style={{ transitionDelay: "0.4s" }}>
            {[
              { label: "Focus", value: "VLSI" },
              { label: "Status", value: "On WhatsApp", highlight: true },
              { label: "Experience", value: "2 Months" },
            ].map(({ label, value, highlight }) => (
              <div key={label}>
                <div className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-1 ${isLight ? 'text-black/50' : 'text-white/50'} font-bold`}>{label}</div>
                <div className={`text-lg md:text-xl font-bold ${highlight ? (isLight ? 'text-black' : 'text-white') : (isLight ? 'text-black/80' : 'text-white/80')} transition-colors duration-500`}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal p-6 md:p-10 bg-[var(--glass-panel)] backdrop-blur-md border border-[var(--glass-border)] rounded-xl hover-target transition-colors duration-500" style={{ transitionDelay: "0.3s" }}>
          <div className={`font-anton text-2xl md:text-3xl tracking-wide mb-6 md:mb-8 ${isLight ? 'text-black border-black/20' : 'text-white border-white/20'} border-b pb-4 transition-colors duration-500`}>
            TECHNICAL SKILLS
          </div>
          <div className="space-y-5 md:space-y-6">
            {SKILLS.map(({ name, width }) => (
              <div key={name}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-bold text-xs md:text-sm tracking-wider uppercase ${isLight ? 'text-black/80' : 'text-white/80'} transition-colors duration-500`}>{name}</span>
                </div>
                <div className={`w-full h-[4px] md:h-[6px] ${isLight ? 'bg-black/10' : 'bg-white/20'} rounded-full overflow-hidden transition-colors duration-500`}>
                  <div 
                    className={`h-full ${isLight ? 'bg-black' : 'bg-white'} shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-colors duration-500`} 
                    style={{ width: `${width * 100}%`, transition: "width 1.5s ease-in-out" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Work({ isLight }) {
  const [activeTab, setActiveTab] = useState("CS");
  const filteredProjects = PROJECTS.filter(p => p.category === activeTab);

  return (
    <section id="work" className="relative z-20 py-16 md:py-28 px-4 md:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto mb-10 md:mb-14 reveal">
        <div className={`font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 ${isLight ? 'text-black/60' : 'text-white/60'} drop-shadow-md text-center md:text-left`}>
          02 — Selected Work
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <h2 className={`font-anton text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-wide text-center md:text-left ${isLight ? 'text-black' : 'text-white'} drop-shadow-lg transition-colors duration-500`}>
            THINGS I'VE<br />BUILT
          </h2>

          <div className="flex bg-[var(--glass-panel)] backdrop-blur-md border border-[var(--glass-border)] p-1.5 rounded-lg mx-auto md:mx-0 transition-colors duration-500">
            <button
              onClick={() => setActiveTab("CS")}
              className={`w-[120px] sm:w-[130px] md:w-[150px] py-2 md:py-3 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-all rounded-md ${activeTab === "CS" ? (isLight ? 'bg-black text-white' : 'bg-white text-black') : (isLight ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white')}`}
            >
              CS Projects
            </button>
            <button
              onClick={() => setActiveTab("ECE")}
              className={`w-[120px] sm:w-[130px] md:w-[150px] py-2 md:py-3 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-all rounded-md ${activeTab === "ECE" ? (isLight ? 'bg-black text-white' : 'bg-white text-black') : (isLight ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white')}`}
            >
              Hardware
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((p) => (
          <div 
            key={`${p.num}-${activeTab}`} 
            className={`project-card p-6 md:p-12 border border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-md ${isLight ? 'hover:border-black' : 'hover:border-white'} hover:-translate-y-1 transition-all duration-300 rounded-xl group shadow-lg hover-target`}
            style={{ animation: 'tabFadeIn 0.5s ease-out forwards' }}
          >
            <div className={`font-bold text-[10px] md:text-[11px] tracking-[0.2em] mb-4 md:mb-6 ${isLight ? 'text-black/60' : 'text-white/60'}`}>{p.num}</div>
            <div className={`font-anton text-2xl sm:text-3xl md:text-4xl tracking-wide mb-3 md:mb-4 ${isLight ? 'text-black' : 'text-white'} drop-shadow-md transition-colors duration-500`}>{p.name}</div>
            <p className={`text-[0.9rem] md:text-[0.95rem] leading-[1.6] md:leading-[1.7] mb-6 md:mb-8 ${isLight ? 'text-black/80' : 'text-white/80'} font-medium transition-colors duration-500`}>{p.desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {p.tags.map(t => (
                <span key={t} className={`text-[8px] md:text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 ${isLight ? 'bg-white border-black/20 text-black/80 group-hover:border-black group-hover:bg-black group-hover:text-white' : 'bg-black border-white/20 text-white/80 group-hover:border-white group-hover:bg-white group-hover:text-black'} border rounded-full transition-colors`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({ isLight }) {
  return (
    <section id="experience" className="relative z-20 py-16 md:py-28 px-4 md:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto mb-10 md:mb-14 reveal">
        <div className={`font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 ${isLight ? 'text-black/60' : 'text-white/60'} drop-shadow-md text-center md:text-left`}>
          03 — Experience
        </div>
        <h2 className={`font-anton text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-wide text-center md:text-left ${isLight ? 'text-black' : 'text-white'} drop-shadow-lg transition-colors duration-500`}>
          WHERE I'VE<br />WORKED
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className={`project-card reveal p-6 md:p-12 border border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-md ${isLight ? 'hover:border-black' : 'hover:border-white'} transition-all duration-300 rounded-xl group shadow-lg flex flex-col md:flex-row justify-between gap-6 md:gap-12 hover-target`}>
            <div className="md:w-1/3">
              <div className={`font-bold text-[10px] md:text-[11px] tracking-[0.2em] mb-2 md:mb-4 ${isLight ? 'text-black/60' : 'text-white/60'}`}>{exp.timeline}</div>
              <div className={`font-anton text-3xl sm:text-4xl md:text-5xl tracking-wide mb-2 ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>{exp.company}</div>
              <div className={`text-base md:text-lg ${isLight ? 'text-black/80' : 'text-white/80'} font-bold mt-2 md:mt-4 transition-colors duration-500`}>{exp.role}</div>
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <p className={`text-[0.9rem] md:text-[0.95rem] leading-[1.6] md:leading-[1.7] mb-6 md:mb-8 ${isLight ? 'text-black/70 group-hover:text-black/90' : 'text-white/70 group-hover:text-white/90'} transition-colors font-medium`}>
                {exp.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(t => (
                  <span key={t} className={`text-[8px] md:text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 ${isLight ? 'bg-white border-black/20 text-black/80 group-hover:border-black group-hover:bg-black group-hover:text-white' : 'bg-black border-white/20 text-white/80 group-hover:border-white group-hover:bg-white group-hover:text-black'} border rounded-full transition-colors`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionDivider({ isLight }) {
  return (
    <div className="relative w-full py-12 md:py-20 flex items-center justify-center z-20 reveal">
      <div className={`absolute w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent ${isLight ? 'via-black/20' : 'via-white/20'} to-transparent transition-colors duration-500`}></div>
      <div className={`relative ${isLight ? 'bg-white border-black/20 hover:border-black/50' : 'bg-black border-white/20 hover:border-white/50'} px-4 md:px-6 py-1.5 border rounded-full flex items-center gap-2 md:gap-3 transition-colors duration-500 hover-target`}>
        <div className={`w-2 md:w-3 h-[1px] ${isLight ? 'bg-black/40' : 'bg-white/40'}`}></div>
        <div className={`w-1 md:w-1.5 h-1 md:h-1.5 ${isLight ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
        <div className={`w-2 md:w-3 h-[1px] ${isLight ? 'bg-black/40' : 'bg-white/40'}`}></div>
      </div>
    </div>
  );
}

function Contact({ isLight }) {
  return (
    <section id="contact" className={`relative z-20 py-16 md:py-32 px-4 md:px-12 bg-gradient-to-t ${isLight ? 'from-white' : 'from-black'} to-transparent transition-colors duration-500`}>
      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-24 p-6 sm:p-8 md:p-10 bg-[var(--glass-panel)] backdrop-blur-lg border border-[var(--glass-border)] rounded-2xl shadow-2xl hover-target overflow-hidden transition-colors duration-500">
        <div>
          <h2 className={`reveal font-anton text-4xl sm:text-5xl md:text-7xl leading-[0.9] tracking-wide ${isLight ? 'text-black' : 'text-white'} drop-shadow-lg transition-colors duration-500`}>
            LET'S<br />
            <span className={isLight ? 'text-black/50' : 'text-white/50'}>WORK</span><br />
            ALONE
          </h2>
        </div>

        <div>
          <p className={`reveal text-base md:text-lg leading-[1.6] md:leading-[1.7] mb-8 md:mb-10 font-medium ${isLight ? 'text-black/80' : 'text-white/80'} transition-colors duration-500`} style={{ transitionDelay: "0.1s" }}>
            I'm open to learning and collaborating on new projects. I want to learn, please approach me for learning stuff.
          </p>

          <div className="reveal flex flex-col" style={{ transitionDelay: "0.2s" }}>
            {[
              { label: "Email", value: "sumeet@gmail.com", href: "mailto:officialsumeet22@gmail.com", icon: "✉" },
              { label: "LinkedIn", value: "in/sumeet", href: "https://www.linkedin.com/in/histaxe/", icon: "in" },
              { label: "GitHub", value: "github.com/Sumeet", href: "https://github.com/Tellu-rium", icon: "gh" },
            ].map(({ label, value, href, icon }) => (
              <a key={label} href={href} className={`group flex items-center gap-3 md:gap-4 no-underline py-3 md:py-4 border-t ${isLight ? 'border-black/20 hover:border-black' : 'border-white/20 hover:border-white'} transition-all duration-300 overflow-hidden hover-target`}>
                <span className={`font-bold text-[10px] md:text-[12px] tracking-[0.2em] uppercase min-w-[20px] md:min-w-[30px] ${isLight ? 'text-black/50 group-hover:text-black' : 'text-white/50 group-hover:text-white'} transition-colors`}>{icon}</span>
                <span className={`font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase min-w-[60px] md:min-w-[70px] ${isLight ? 'text-black/40 group-hover:text-black/70' : 'text-white/40 group-hover:text-white/70'} transition-colors`}>{label}</span>
                <span className={`font-bold text-sm sm:text-base md:text-lg ${isLight ? 'text-black' : 'text-white'} group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform break-all md:break-normal`}>{value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ isLight }) {
  return (
    <footer className={`relative z-20 px-6 md:px-12 py-6 md:py-8 ${isLight ? 'bg-white' : 'bg-black'} border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 font-bold text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-center md:text-left ${isLight ? 'text-black/50' : 'text-white/50'} transition-colors duration-500`}>
      <span>© 2026 Sumeet</span>
      <span>Designed & built with VSCode ofc (JK)</span>
      <span>India</span>
    </footer>
  );
}

function BlogSection({ onSelectPost, isLight }) {
  return (
    <section id="blog-list" className="relative z-20 py-16 md:py-28 px-4 md:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto mb-10 md:mb-14 reveal">
        <div className={`font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 ${isLight ? 'text-black/60' : 'text-white/60'} text-center md:text-left`}>
          Weekly Logs
        </div>
        <h2 className={`font-anton text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-wide text-center md:text-left ${isLight ? 'text-black' : 'text-white'} transition-colors duration-500`}>
          WRITINGS &<br />THOUGHTS
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOGS_LIST.map((blog) => (
          <div 
            key={blog.id} 
            onClick={() => onSelectPost(blog)}
            className={`project-card reveal p-6 md:p-10 border border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-md ${isLight ? 'hover:border-black' : 'hover:border-white'} transition-all duration-300 rounded-xl group shadow-lg cursor-pointer hover-target`}
          >
            <div className={`font-bold text-[10px] tracking-[0.2em] mb-4 ${isLight ? 'text-black/50' : 'text-white/50'}`}>{blog.date}</div>
            <h3 className={`font-anton text-2xl md:text-3xl mb-4 ${isLight ? 'text-black group-hover:text-black/70' : 'text-white group-hover:text-white/70'} transition-colors`}>{blog.title}</h3>
            <p className={`text-[0.9rem] md:text-[0.95rem] ${isLight ? 'text-black/70' : 'text-white/70'} font-medium line-clamp-3 transition-colors duration-500`}>{blog.excerpt}</p>
            <div className={`mt-6 text-[10px] font-bold tracking-[0.2em] uppercase ${isLight ? 'text-black border-black/20' : 'text-white border-white/20'} border-t pt-4 group-hover:translate-x-2 transition-transform inline-block`}>
              Open Log →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogReader({ post, onBack, isLight }) {
  const renderContent = (rawText) => {
    return rawText.split("\n\n").map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("# ")) {
        return <h1 key={idx} className={`font-anton text-3xl md:text-5xl my-6 ${isLight ? 'text-black' : 'text-white'} tracking-wide transition-colors duration-500`}>{trimmed.replace("# ", "")}</h1>;
      }
      if (trimmed.startsWith("### ")) {
        return <h3 key={idx} className={`font-anton text-xl md:text-2xl mt-8 mb-4 ${isLight ? 'text-black/80' : 'text-white/80'} tracking-wide transition-colors duration-500`}>{trimmed.replace("### ", "")}</h3>;
      }
      if (trimmed.startsWith("![")) {
        const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) return <img key={idx} src={match[2]} alt={match[1]} className={`w-full max-w-[700px] h-auto my-8 mx-auto rounded-xl border ${isLight ? 'border-black/20' : 'border-white/20'} shadow-2xl transition-colors duration-500`} />;
      }
      
      return (
        <p key={idx} className={`text-base md:text-lg ${isLight ? 'text-black/80' : 'text-white/80'} leading-relaxed mb-6 font-medium transition-colors duration-500`}>
          {trimmed.split(/(\[.*?\]\(.*?\))/g).map((part, pIdx) => {
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) return <a key={pIdx} href={linkMatch[2]} target="_blank" rel="noreferrer" className={`${isLight ? 'text-black hover:text-black/60' : 'text-white hover:text-white/60'} underline underline-offset-4 font-bold transition-colors`}>{linkMatch[1]}</a>;
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 relative z-20">
      <div className="max-w-[800px] mx-auto bg-[var(--glass-panel)] border border-[var(--glass-border)] backdrop-blur-md p-6 md:p-12 rounded-2xl transition-colors duration-500">
        <button onClick={onBack} className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase ${isLight ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'} mb-10 transition-colors hover-target`}>
          ← Back to Logs
        </button>
        <div className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase ${isLight ? 'text-black/50' : 'text-white/50'} mb-2`}>{post.date}</div>
        <div className={`border-t ${isLight ? 'border-black/20' : 'border-white/20'} pt-8 transition-colors duration-500`}>
          {renderContent(post.content)}
        </div>
      </div>
    </div>
  );
}

function useReveal(dependencies = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll(".reveal");
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
      }, { threshold: 0.12 });
      
      reveals.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, dependencies);
}

export default function Portfolio() {
  const [isEntered, setIsEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [activePost, setActivePost] = useState(null);
  
  const [isLight, setIsLight] = useState(false);
  
  useReveal([currentPage, activePost]);

  useEffect(() => {
    if (!isEntered) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isEntered]);

  useEffect(() => {
    if (isLight) document.body.classList.add('light');
    else document.body.classList.remove('light');
  }, [isLight]);

  return (
    <div className={`relative overflow-x-hidden min-h-screen selection:${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      <div className={`landing-screen ${isEntered ? "fade-out" : ""}`} onClick={() => setIsEntered(true)}>
        <img src={logo} alt="Click to enter" className={`w-64 h-64 md:w-96 md:h-96 object-cover cursor-pointer hover:scale-105 transition-all duration-700 ${isLight ? 'invert' : ''}`} />
      </div>

      <div className="stars-overlay"></div>
      <div className="clouds-overlay"></div>
      <CustomCursor isLight={isLight} />
      
      <Header 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setActivePost(null); 
        }} 
        isLight={isLight} 
        setIsLight={setIsLight} 
      />

      {currentPage === "home" && (
        <>
          <Hero isLight={isLight} />
          <Marquee isLight={isLight} />
          <About isLight={isLight} />
          <Work isLight={isLight} />
          <Experience isLight={isLight} />
          <SectionDivider isLight={isLight} />
          <Contact isLight={isLight} />
        </>
      )}

      {currentPage === "blog" && !activePost && (
        <div className="pt-12 min-h-screen">
          <BlogSection onSelectPost={setActivePost} isLight={isLight} />
        </div>
      )}

      {currentPage === "blog" && activePost && (
        <BlogReader post={activePost} onBack={() => setActivePost(null)} isLight={isLight} />
      )}

      <Footer isLight={isLight} />
    </div>
  );
}