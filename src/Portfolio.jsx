import { useEffect, useRef } from "react";
import "./index.css";
import logo2 from "./logo2.svg";

// ── Data ──────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "Python / ML",       width: 0.88 },
  { name: "React / Next.js",   width: 0.85 },
  { name: "MATLAB / Simulink", width: 0.80 },
  { name: "Node.js",           width: 0.75 },
  { name: "UI / UX Design",    width: 0.82 },
  { name: "C / C++",           width: 0.70 },
];

const PROJECTS = [
  {
    num: "01 — 2025",
    name: "Adaptive PI Controller",
    desc: "ML-based gain tuning for engine RPM control. Neural network predicts correction factors for a PI controller responding to disturbance inputs — built for Caterpillar hackathon.",
    tags: ["Python", "MATLAB", "Simulink", "scikit-learn"],
    delay: "0.1s",
  },
  {
    num: "02 — 2024",
    name: "Design System",
    desc: "A comprehensive component library built from scratch — tokens, primitives, and patterns. Covers typography, color, spacing, and interaction states for a cohesive product language.",
    tags: ["React", "TypeScript", "Figma"],
    delay: "0.2s",
  },
  {
    num: "03 — 2024",
    name: "Data Visualizer",
    desc: "Interactive dashboard for exploring large datasets with real-time filtering, drill-down views, and exportable charts. Built with a focus on performance at scale.",
    tags: ["Next.js", "D3.js", "PostgreSQL"],
    delay: "0.3s",
  },
  {
    num: "04 — 2023",
    name: "Open Source CLI",
    desc: "A developer productivity tool that automates repetitive workflows. 200+ GitHub stars. Includes plugin architecture, colored output, and cross-platform support.",
    tags: ["Node.js", "Shell", "Open Source"],
    delay: "0.4s",
  },
];

const MARQUEE_ITEMS = [
  "UI Design", "Full-Stack Dev", "Machine Learning",
  "Creative Coding", "Systems Thinking", "Open to Work",
];

// ── Components ────────────────────────────────────────────────────────────────

function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const ring      = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  useEffect(() => {
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
        cursorRef.current.style.width  = "16px";
        cursorRef.current.style.height = "16px";
        ringRef.current.style.width    = "56px";
        ringRef.current.style.height   = "56px";
        ringRef.current.style.opacity  = "0.2";
      });
      el.addEventListener("mouseleave", () => {
        if (!cursorRef.current || !ringRef.current) return;
        cursorRef.current.style.width  = "10px";
        cursorRef.current.style.height = "10px";
        ringRef.current.style.width    = "36px";
        ringRef.current.style.height   = "36px";
        ringRef.current.style.opacity  = "0.4";
      });
    };
    document.querySelectorAll("a, button, .project-card").forEach(grow);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor fixed w-[10px] h-[10px] rounded-full pointer-events-none z-[9999]"
        style={{ background: "var(--accent)", transform: "translate(-50%,-50%)", transition: "width .2s, height .2s" }}
      />
      <div
        ref={ringRef}
        className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] border border-[var(--ink)] opacity-40"
        style={{ transform: "translate(-50%,-50%)", transition: "width .2s, height .2s, opacity .2s" }}
      />
    </>
  );
}

function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-12 py-6 border-b backdrop-blur-md"
      style={{ borderColor: "var(--border)", background: "rgba(245,243,238,0.85)" }}
    >
      <div className="font-syne font-extrabold text-4xl tracking-widest uppercase" style={{ color: "var(--ink)" }}>
        S·M
      </div>

      {/* Center Logo Added Here */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-18 pointer-events-none">
        <img src={logo2} alt="Logo" className="h-full w-auto block" style={{ filter: "contrast(1.05)" }} />
      </div>

      <nav className="flex gap-10 items-center">
        {["about", "work", "contact"].map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className="nav-link relative text-[11px] tracking-widest uppercase transition-colors duration-200 no-underline"
            style={{ color: "var(--muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            {s}
          </a>
        ))}
        <a
          href="mailto:sumeet@example.com"
          className="text-[11px] tracking-[0.08em] uppercase px-5 py-2 border transition-colors duration-200 no-underline"
          style={{ border: "1px solid var(--ink)", color: "var(--ink)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: "8rem 3rem 4rem", background: "var(--paper)" }}
    >
      <div className="hero-grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      {[
        { cls: "top-4 left-4",     txt: "43.8°N"    },
        { cls: "top-4 right-4",    txt: "2025"      },
        { cls: "bottom-4 left-4",  txt: "Portfolio" },
        { cls: "bottom-4 right-4", txt: "v1.0"      },
      ].map(({ cls, txt }) => (
        <span key={txt} className={`absolute font-mono-dm text-[9px] tracking-[0.15em] opacity-50 ${cls}`}
          style={{ color: "var(--muted)" }}>{txt}</span>
      ))}

      <div className="fadeup-1 flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase mb-12"
        style={{ color: "var(--muted)" }}>
        <span className="w-10 h-px" style={{ background: "var(--muted)" }} />
        Designer &amp; Developer
        <span className="w-10 h-px" style={{ background: "var(--muted)" }} />
      </div>

      {/* Replaced Logo with Placeholder Here */}
      <div className="fadeup-2 relative flex items-center justify-center border border-dashed bg-[rgba(138,133,121,0.05)]" style={{ width: "min(560px, 88vw)", height: "280px", borderColor: "var(--muted)" }}>
        <span className="font-mono-dm text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--muted)" }}>
          [ Placeholder Element ]
        </span>
        <div className="logo-line absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-0 h-0.5"
          style={{ background: "var(--accent)" }} />
      </div>

      <p
        className="fadeup-3 font-cormorant italic font-light text-center mt-12 max-w-[480px] leading-relaxed"
        style={{ fontSize: "clamp(1.1rem,2.5vw,1.45rem)", color: "var(--muted)" }}
      >
        Crafting digital experiences that live at the intersection of{" "}
        <em style={{ color: "var(--accent)" }}>form</em> and{" "}
        <em style={{ color: "var(--accent)" }}>function</em>
      </p>

      <div
        className="fadeup-4 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.2em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        <div className="scroll-line-anim w-px h-12"
          style={{ background: "linear-gradient(to bottom, var(--muted), transparent)" }} />
        Scroll
      </div>
    </section>
  );
}

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-5 border-t border-b" style={{ background: "var(--warm)", borderColor: "var(--border)" }}>
      <div className="marquee-anim flex gap-16 w-max">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="font-syne font-bold text-[0.85rem] tracking-[0.2em] uppercase whitespace-nowrap flex items-center gap-8"
            style={{ color: "var(--muted)" }}
          >
            {item}
            <span className="inline-block w-1 h-1 rounded-full" style={{ background: "var(--accent)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const aboutRightRef = useRef(null);

  useEffect(() => {
    const el = aboutRightRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.querySelectorAll(".skill-bar").forEach(bar => bar.classList.add("animate"));
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 px-12" style={{ background: "var(--paper)" }}>
      <div className="max-w-[1200px] mx-auto grid gap-24 items-start" style={{ gridTemplateColumns: "1fr 1fr" }}>

        {/* Left */}
        <div>
          <div className="reveal flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent)" }}>
            <span className="opacity-60" style={{ color: "var(--muted)" }}>01</span>
            About
          </div>
          <h2
            className="reveal font-syne font-bold leading-[1.05] tracking-tight mb-12"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", transitionDelay: "0.1s" }}
          >
            Building things<br />that matter
          </h2>
          <p className="reveal font-cormorant font-light leading-[1.75] text-[1.3rem] mb-8"
            style={{ color: "var(--ink)", transitionDelay: "0.2s" }}>
            I'm Sumeet — a developer and designer passionate about creating{" "}
            <em style={{ color: "var(--accent)" }}>thoughtful, well-crafted</em>{" "}
            digital products. I bridge the gap between clean engineering and intentional design.
          </p>
          <p className="reveal font-cormorant font-light leading-[1.75] text-[1.3rem]"
            style={{ color: "var(--ink)", transitionDelay: "0.3s" }}>
            Currently exploring machine learning applications, control systems, and building tools that solve real problems elegantly.
          </p>

          <div className="reveal grid grid-cols-2 gap-6 mt-10" style={{ transitionDelay: "0.4s" }}>
            {[
              { label: "Based in",   value: "India",                accent: false },
              { label: "Focus",      value: "Engineering & Design", accent: false },
              { label: "Status",     value: "● Available",          accent: true  },
              { label: "Experience", value: "3+ Years",             accent: false },
            ].map(({ label, value, accent }) => (
              <div key={label} className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <div className="font-mono-dm text-[9px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--muted)" }}>{label}</div>
                <div className="font-mono-dm text-[0.9rem]"
                  style={{ color: accent ? "var(--accent)" : "var(--ink)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Skills */}
        <div ref={aboutRightRef} className="reveal" style={{ transitionDelay: "0.3s" }}>
          <div className="font-syne font-semibold text-[0.85rem] tracking-[0.05em] uppercase mb-6"
            style={{ color: "var(--ink)" }}>Technical Skills</div>

          {SKILLS.map(({ name, width }) => (
            <div key={name} className="flex justify-between items-center py-[0.9rem] border-b"
              style={{ borderColor: "var(--border)" }}>
              <span className="font-mono-dm text-[0.85rem]" style={{ color: "var(--ink)" }}>{name}</span>
              <div className="w-[120px] h-[2px] relative overflow-hidden" style={{ background: "var(--warm)" }}>
                <div
                  className="skill-bar absolute top-0 left-0 h-full"
                  style={{ background: "var(--ink)", "--bar-width": width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="py-28 px-12" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="max-w-[1200px] mx-auto mb-16 reveal">
        <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--accent)" }}>
          <span className="opacity-60" style={{ color: "var(--muted)" }}>02</span>
          Selected Work
        </div>
        <h2 className="font-syne font-bold leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--paper)" }}>
          Things I've<br />built
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto grid gap-[2px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {PROJECTS.map((p) => (
          <div
            key={p.num}
            className="project-card reveal relative p-12 transition-colors duration-300 overflow-hidden cursor-none"
            style={{
              border: "1px solid rgba(245,243,238,0.08)",
              background: "rgba(245,243,238,0.02)",
              transitionDelay: p.delay,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(245,243,238,0.05)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(245,243,238,0.02)")}
          >
            <div
              className="project-arrow absolute top-12 right-12 w-8 h-8 flex items-center justify-center text-[14px] transition-all duration-300"
              style={{ border: "1px solid rgba(245,243,238,0.15)", color: "rgba(245,243,238,0.3)", transform: "rotate(-45deg)" }}
            >→</div>

            <div className="font-mono-dm text-[9px] tracking-[0.2em] mb-12"
              style={{ color: "rgba(245,243,238,0.3)" }}>{p.num}</div>
            <div className="font-syne font-bold text-[1.6rem] leading-[1.1] tracking-tight mb-4"
              style={{ color: "var(--paper)" }}>{p.name}</div>
            <p className="font-mono-dm text-[0.8rem] leading-[1.7] mb-8"
              style={{ color: "rgba(245,243,238,0.55)" }}>{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map(t => (
                <span key={t} className="font-mono-dm text-[9px] tracking-[0.12em] uppercase px-3 py-1"
                  style={{ border: "1px solid rgba(245,243,238,0.15)", color: "rgba(245,243,238,0.5)" }}>
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

function LogoDivider() {
  return (
    <div className="w-full overflow-hidden relative py-8 border-t border-b"
      style={{ background: "var(--warm)", borderColor: "var(--border)" }}>
      <div className="divider-anim flex w-max items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <img key={i} src={logo2} alt=""
            className="logo-divider-img h-[120px] w-auto block flex-shrink-0"
            style={{ filter: "contrast(0.85) opacity(0.45)" }} />
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 px-12 relative overflow-hidden" style={{ background: "var(--paper)" }}>
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120%] max-w-[1400px] pointer-events-none z-0">
        <img src={logo2} alt="" className="watermark-img w-full h-auto block"
          style={{ filter: "contrast(0.6) opacity(0.07)" }} />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto grid items-center gap-24"
        style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <h2 className="reveal font-syne font-extrabold leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}>
            Let's<br />
            <span className="font-cormorant font-light italic" style={{ color: "var(--accent)" }}>work</span>
            <br />together
          </h2>
        </div>

        <div>
          <p className="reveal font-cormorant font-light text-[1.2rem] leading-[1.7] mb-10"
            style={{ color: "var(--muted)", transitionDelay: "0.1s" }}>
            I'm open to freelance projects, full-time roles, and interesting collaborations. If you have something in mind, let's talk.
          </p>

          <div className="reveal flex flex-col" style={{ transitionDelay: "0.2s" }}>
            {[
              { label: "Email",    value: "sumeet@example.com",    href: "mailto:sumeet@example.com" },
              { label: "LinkedIn", value: "linkedin.com/in/sumeet", href: "#" },
              { label: "GitHub",   value: "github.com/sumeet",      href: "#" },
              { label: "Twitter",  value: "@sumeet",                href: "#" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href}
                className="contact-link flex items-center gap-4 no-underline py-4 border-t font-mono-dm text-[0.85rem] transition-all duration-300"
                style={{ borderColor: "var(--border)", color: "var(--ink)" }}
              >
                <span className="text-[9px] tracking-[0.2em] uppercase min-w-[80px]"
                  style={{ color: "var(--muted)" }}>{label}</span>
                <span style={{ color: "var(--ink)" }}>{value}</span>
                <span className="contact-arrow ml-auto transition-transform duration-200"
                  style={{ color: "var(--muted)" }}>→</span>
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
    <footer className="px-12 py-8 border-t flex justify-between items-center font-mono-dm text-[10px] tracking-[0.12em] uppercase"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
      <span>© 2025 Sumeet</span>
      <span>Designed &amp; built with intention</span>
      <span>India</span>
    </footer>
  );
}

// ── Scroll Reveal Hook ────────────────────────────────────────────────────────
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

// ── App ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  useReveal();

  return (
    <div className="font-mono-dm text-[13px] leading-[1.7] overflow-x-hidden"
      style={{ background: "var(--paper)", color: "var(--ink)" }}>

      <div className="noise-overlay fixed inset-0 pointer-events-none z-[1000] opacity-60" />

      <CustomCursor />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <LogoDivider />
      <Contact />
      <Footer />
    </div>
  );
}