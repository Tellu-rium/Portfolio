import { useEffect, useRef, useState } from "react";
import "./index.css";
import Profile from "./assets/Profile.png";
import logo from "./assets/logo2.png";

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
  "Capacitors and MOSFETs rule the world", 
  "My favorite circuit is CMOS Inverter", 
  "You know Ring oscillators are like thermometer for silicon speed"
];

function CustomCursor() {
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
        ringRef.current.style.backgroundColor = "rgba(255,255,255,0.1)";
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
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-[8px] h-[8px] rounded-full pointer-events-none z-[9999] bg-white mix-blend-difference"
        style={{ transform: "translate(-50%,-50%)", transition: "width .2s, height .2s" }}
      />
      <div
        ref={ringRef}
        className="hidden md:block fixed w-[30px] h-[30px] rounded-full pointer-events-none z-[9998] border border-white opacity-60 mix-blend-difference"
        style={{ transform: "translate(-50%,-50%)", transition: "width .2s, height .2s, background-color .2s" }}
      />
    </>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-12 py-4 md:py-6">
        <div className="text-white px-3 md:px-4 py-1 text-xl md:text-3xl font-anton tracking-wide hover-target relative z-50">
          SM
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-300 font-bold text-[13px] tracking-wider uppercase drop-shadow-md items-center">
          <a href="#about" className="hover:text-white transition-colors hover-target">About</a>
          <a href="#work" className="hover:text-white transition-colors hover-target">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors hover-target">Experience</a>
          <a href="#contact" className="hover:text-white transition-colors hover-target">Contact</a>
          <a href="mailto:officialsumeet22@gmail.com" className="ml-4 hover:text-white transition-colors hover-target">
            Hire me
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden relative z-50 p-2 hover-target focus:outline-none"
        >
          <div className="flex flex-col gap-1.5 w-7">
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-8 text-white font-anton text-3xl tracking-widest uppercase">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400 transition-colors">About</a>
          <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400 transition-colors">Projects</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400 transition-colors">Experience</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400 transition-colors">Contact</a>
          <a href="mailto:officialsumeet22@gmail.com" onClick={() => setIsMenuOpen(false)} className="mt-4 text-xl border border-white px-8 py-3 hover:bg-white hover:text-black transition-all">
            Hire me
          </a>
        </nav>
      </div>
    </>
  );
}

function Hero() {
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

      <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-black via-black/50 to-transparent z-30 pointer-events-none" />
    </section>
  );
}

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-3 md:py-5 bg-black bg-opacity-80 backdrop-blur-md border-t border-b border-[var(--glass-border)] relative z-30 hover-target">
      <div className="marquee-anim flex gap-8 md:gap-16 w-max">
        {doubled.map((item, i) => (
          <div key={i} className="font-anton text-lg md:text-2xl tracking-wide whitespace-nowrap flex items-center gap-6 md:gap-8 text-white">
            {item}
            <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-500 opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative z-20 py-16 md:py-28 px-4 md:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-start">
        
        <div className="p-6 md:p-10 bg-[var(--glass-panel)] backdrop-blur-md border border-[var(--glass-border)] rounded-xl hover-target">
          <div className="reveal font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 text-gray-400 drop-shadow-md">
            01 — About
          </div>
          <h2 className="reveal font-anton text-3xl sm:text-4xl md:text-6xl leading-[1.05] mb-6 md:mb-8 text-white tracking-wide">
            BUILDING THINGS<br />THAT MATTER
          </h2>
          <p className="reveal text-base md:text-xl leading-relaxed mb-6 font-medium text-gray-300" style={{ transitionDelay: "0.2s" }}>
            Lemme introduce myself, I am Sumeet a passionate thinker <em className="text-white font-bold not-italic">who's figuring out his genuine interests.</em> Till now I love Digital Design and Making random websites, I am open to exploring new fields and learning new things.
          </p>
          <p className="reveal text-base md:text-xl leading-relaxed font-medium text-gray-300" style={{ transitionDelay: "0.3s" }}>
            Currently exploring Digital VLSI, doing VHDL, and studying Douglas Perry's VHDL.
          </p>

          <div className="reveal grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10 pt-6 border-t border-gray-700" style={{ transitionDelay: "0.4s" }}>
            {[
              { label: "Focus", value: "VLSI" },
              { label: "Status", value: "On WhatsApp", highlight: true },
              { label: "Experience", value: "2 Months" },
            ].map(({ label, value, highlight }) => (
              <div key={label}>
                <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-1 text-gray-500 font-bold">{label}</div>
                <div className={`text-lg md:text-xl font-bold ${highlight ? "text-white" : "text-gray-300"}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal p-6 md:p-10 bg-[var(--glass-panel)] backdrop-blur-md border border-[var(--glass-border)] rounded-xl hover-target" style={{ transitionDelay: "0.3s" }}>
          <div className="font-anton text-2xl md:text-3xl tracking-wide mb-6 md:mb-8 text-white border-b border-gray-700 pb-4">
            TECHNICAL SKILLS
          </div>
          <div className="space-y-5 md:space-y-6">
            {SKILLS.map(({ name, width }) => (
              <div key={name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xs md:text-sm tracking-wider uppercase text-gray-300">{name}</span>
                </div>
                <div className="w-full h-[4px] md:h-[6px] bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
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

function Work() {
  const [activeTab, setActiveTab] = useState("CS");
  const filteredProjects = PROJECTS.filter(p => p.category === activeTab);

  return (
    <section id="work" className="relative z-20 py-16 md:py-28 px-4 md:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto mb-10 md:mb-14 reveal">
        <div className="font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 text-gray-400 drop-shadow-md text-center md:text-left">
          02 — Selected Work
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <h2 className="font-anton text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-wide text-center md:text-left text-white drop-shadow-lg">
            THINGS I'VE<br />BUILT
          </h2>

          <div className="flex bg-[var(--glass-panel)] backdrop-blur-md border border-[var(--glass-border)] p-1.5 rounded-lg mx-auto md:mx-0">
            <button
              onClick={() => setActiveTab("CS")}
              className={`w-[120px] sm:w-[130px] md:w-[150px] py-2 md:py-3 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-all rounded-md ${activeTab === "CS" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
            >
              CS Projects
            </button>
            <button
              onClick={() => setActiveTab("ECE")}
              className={`w-[120px] sm:w-[130px] md:w-[150px] py-2 md:py-3 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-all rounded-md ${activeTab === "ECE" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
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
            className="project-card p-6 md:p-12 border border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-md hover:border-white hover:-translate-y-1 transition-all duration-300 rounded-xl group shadow-lg hover-target"
            style={{ animation: 'tabFadeIn 0.5s ease-out forwards' }}
          >
            <div className="font-bold text-[10px] md:text-[11px] tracking-[0.2em] mb-4 md:mb-6 text-gray-400">{p.num}</div>
            <div className="font-anton text-2xl sm:text-3xl md:text-4xl tracking-wide mb-3 md:mb-4 text-white drop-shadow-md">{p.name}</div>
            <p className="text-[0.9rem] md:text-[0.95rem] leading-[1.6] md:leading-[1.7] mb-6 md:mb-8 text-gray-300 font-medium">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {p.tags.map(t => (
                <span key={t} className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 bg-black border border-gray-700 text-gray-300 rounded-full group-hover:border-white group-hover:bg-white group-hover:text-black transition-colors">
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

function Experience() {
  return (
    <section id="experience" className="relative z-20 py-16 md:py-28 px-4 md:px-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto mb-10 md:mb-14 reveal">
        <div className="font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 text-gray-400 drop-shadow-md text-center md:text-left">
          03 — Experience
        </div>
        <h2 className="font-anton text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-wide text-center md:text-left text-white drop-shadow-lg">
          WHERE I'VE<br />WORKED
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="project-card reveal p-6 md:p-12 border border-[var(--glass-border)] bg-[var(--glass-panel)] backdrop-blur-md hover:border-white transition-all duration-300 rounded-xl group shadow-lg flex flex-col md:flex-row justify-between gap-6 md:gap-12 hover-target">
            <div className="md:w-1/3">
              <div className="font-bold text-[10px] md:text-[11px] tracking-[0.2em] mb-2 md:mb-4 text-gray-400">{exp.timeline}</div>
              <div className="font-anton text-3xl sm:text-4xl md:text-5xl tracking-wide mb-2 text-white">{exp.company}</div>
              <div className="text-base md:text-lg text-gray-300 font-bold mt-2 md:mt-4">{exp.role}</div>
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <p className="text-[0.9rem] md:text-[0.95rem] leading-[1.6] md:leading-[1.7] mb-6 md:mb-8 text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                {exp.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(t => (
                  <span key={t} className="text-[8px] md:text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 bg-black border border-gray-700 text-gray-300 rounded-full group-hover:border-white group-hover:bg-white group-hover:text-black transition-colors">
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

function SectionDivider() {
  return (
    <div className="relative w-full py-12 md:py-20 flex items-center justify-center z-20 reveal">
      <div className="absolute w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      
      <div className="relative bg-black px-4 md:px-6 py-1.5 border border-gray-800 rounded-full flex items-center gap-2 md:gap-3 transition-colors duration-500 hover:border-gray-500 hover-target">
        <div className="w-2 md:w-3 h-[1px] bg-gray-600"></div>
        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-sm"></div>
        <div className="w-2 md:w-3 h-[1px] bg-gray-600"></div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative z-20 py-16 md:py-32 px-4 md:px-12 bg-gradient-to-t from-black to-transparent">
      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-24 p-6 sm:p-8 md:p-10 bg-[var(--glass-panel)] backdrop-blur-lg border border-[var(--glass-border)] rounded-2xl shadow-2xl hover-target overflow-hidden">
        <div>
          <h2 className="reveal font-anton text-4xl sm:text-5xl md:text-7xl leading-[0.9] tracking-wide text-white drop-shadow-lg">
            LET'S<br />
            <span className="text-gray-400">WORK</span><br />
            ALONE
          </h2>
        </div>

        <div>
          <p className="reveal text-base md:text-lg leading-[1.6] md:leading-[1.7] mb-8 md:mb-10 font-medium text-gray-300" style={{ transitionDelay: "0.1s" }}>
            I'm open to learning and collaborating on new projects. I want to learn, please approach me for learning stuff.
          </p>

          <div className="reveal flex flex-col" style={{ transitionDelay: "0.2s" }}>
            {[
              { label: "Email", value: "officialsumeet22@gmail.com", href: "mailto:officialsumeet22@gmail.com", icon: "✉" },
              { label: "LinkedIn", value: "in/sumeet", href: "https://www.linkedin.com/in/histaxe/", icon: "in" },
              { label: "GitHub", value: "github.com/Sumeet", href: "https://github.com/Tellu-rium", icon: "gh" },
            ].map(({ label, value, href, icon }) => (
              <a key={label} href={href} className="group flex items-center gap-3 md:gap-4 no-underline py-3 md:py-4 border-t border-gray-700 transition-all duration-300 hover:border-white overflow-hidden hover-target">
                <span className="font-bold text-[10px] md:text-[12px] tracking-[0.2em] uppercase min-w-[20px] md:min-w-[30px] text-gray-400 group-hover:text-white transition-colors">{icon}</span>
                <span className="font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase min-w-[60px] md:min-w-[70px] text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
                <span className="font-bold text-sm sm:text-base md:text-lg text-white group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform break-all md:break-normal">{value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-20 px-6 md:px-12 py-6 md:py-8 bg-black border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 font-bold text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-center md:text-left text-gray-500">
      <span>© 2025 Sumeet</span>
      <span>Designed & built with VSCode ofc (JK)</span>
      <span>India</span>
    </footer>
  );
}

function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    reveals.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Portfolio() {
  const [isEntered, setIsEntered] = useState(false);
  useReveal();

  useEffect(() => {
    if (!isEntered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isEntered]);

  return (
    <div className="relative overflow-x-hidden selection:bg-white selection:text-black">
      
      <div 
        className={`landing-screen ${isEntered ? "fade-out" : ""}`} 
        onClick={() => setIsEntered(true)}
      >
        <img 
          src={logo} 
          alt="Click to enter" 
          className="w-96 h-96 object-cover cursor-pointer hover:scale-110 transition-all duration-700"
        />
      </div>

      <div className="stars-overlay"></div>
      <div className="clouds-overlay"></div>

      <CustomCursor />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Experience />
      <SectionDivider />
      <Contact />
      <Footer />
    </div>
  );
}