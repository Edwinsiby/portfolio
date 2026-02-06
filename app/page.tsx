// app/page.tsx
"use client";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Camera, Sun, Moon } from "lucide-react";

/**
 * Single-file portfolio page (developer-focused).
 * Requirements:
 *  - Put profile photo at: public/profile.jpg
 *  - Put resume PDF at: public/resume.pdf
 *
 * This is a Client-rendered page (all interactive features run on client).
 * It uses a tiny custom theme toggle (no next-themes) which sets a 'dark' class
 * on document.documentElement and persists choice in localStorage.
 */

export default function Page() {
  // Theme
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // initialize theme from localStorage or system preference
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      applyTheme(initial);
    }
  }, []);

  function applyTheme(t: "dark" | "light") {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  // Navbar smooth scrolling
  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Data derived from resume
  const projects = [
    {
      title: "Legal Tech Software",
      desc: "Built and scaled legal-tech backend systems powering a major US intellectual property law firm, integrating directly with USPTO",
      link: "https://github.com/LegalForceLawRAPC",
      img:  "/projects/legal.jpg",
    },
    {
      title: "CLI Schedulers & Cron Automation",
      desc: "Designed and built a high-reliability CLI-based scheduling software and servers",
      link: "https://github.com/Edwinsiby/eCommerce-web_development.git",
      img:  "/projects/cli.jpg",
    },
    {
      title: "AD Bidding system",
      desc: "Engineered a real-time ad bidding engine capable of processing thousands of bid requests",
      link: "https://github.com/Edwinsiby/Ascendeum-auction_simulator",
      img:  "/projects/ad.jpg",
    },
    {
      title: "E-Commerce Platform",
      desc: "Microservice based ecommerce servers enabled smooth, fast and secured api calls",
      link: "https://github.com/Edwinsiby/eCommerce-web_development.git",
      img: "/projects/ecom.jpg",
    },
    {
      title: "Email Sender Service",
      desc: "SAAS level email project which replaces third party services for notification and tracking system",
      link: "https://github.com/Edwinsiby/E-MailSender",
      img: "/projects/email.jpg",
    },
    {
      title: "Live Streaming Platform",
      desc: "Comprehensive platform with multi-purpose community level media sharing and engaging users",
      link: "https://github.com/Edwinsiby/streaming-app.git",
      img: "/projects/live.jpg",
    },
    {
      title: "Realtime Chat App",
      desc: "Websocket based group and in person chat system",
      link: "https://github.com/Edwinsiby/Realtime-ChatApp.git",
      img: "/projects/chat.jpg",
    },
    {
      title: "Message Generator (Cron)",
      desc: "Cron based massage system for time consuming jobs",
      link: "https://github.com/Edwinsiby/Message-Generator-GoCron.git",
      img: "/projects/cron.jpg",
    },
    {
      title: "Listmonk OpenSource",
      desc: "Contribution and Adaption of open-source projects into real life business growth",
      link: "https://github.com/Edwinsiby/listmonk",
      img: "/projects/listmonk.jpg",
    }
  ];

  const skills = [
    "Golang",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Gin/Echo/Mux",
    "Microservices",
    "gRPC",
    "WebSocket",
    "Rabbit MQ",
    "Redis",
    "AWS (Lambda,S3,SQS,SES,RDS)",
    "Docker/Kub8",
    "CI/CD,CRON",
    "CLI/Tmux",
    "Terraform",
    "Nginx",
    "Twilio/Mailgun",
    "Worker Pool",
    "Concurrency",
    "Mac/Linux",
  ];

  // Stats: compute years of experience since Dec 2023 (as mentioned in resume)
  function computeYears(sinceYear = 2023, sinceMonth = 12) {
    const start = new Date(sinceYear, sinceMonth - 1, 1);
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    const monthDiff = now.getMonth() - start.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) years--;
    return Math.max(0, years);
  }
  const yearsExperience = computeYears(2022, 12) || 2; // show at least 1

  // small animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
  };
  const [hovered, setHovered] = useState<number | null>(null)
  const handleHover = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const triggerHeight = rect.height * 0.3
  
    if (y <= triggerHeight) {
      setHovered(index)
    } else {
      setHovered(null)
    }
  }
  

  // For simple in-view detection, we can just use viewport prop on motion.
  return (
    <>
      <Head>
        <title>Edwin Siby — Backend Engineer (Golang)</title>
        <meta name="description" content="Edwin Siby — Backend Developer specialized in Golang, microservices, and cloud infrastructure." />
        <meta name="keywords" content="Golang, Backend, Microservices, PostgreSQL, AWS, Docker, CI/CD, Edwin Siby" />

        {/* OpenGraph */}
        <meta property="og:title" content="Edwin Siby — Backend Developer (Golang)" />
        <meta property="og:description" content="Backend engineer building scalable APIs and microservices using Golang, AWS and PostgreSQL." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:url" content="https://your-site.example/" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-[#071226] text-slate-900 dark:text-slate-100 transition-colors">
        {/* NAV */}
        <nav className="fixed left-0 right-0 top-4 z-40">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToId("hero")}
                className="text-lg font-semibold focus:outline-none"
                aria-label="go home"
              >
                EdwinSiby
              </button>
              <div className="hidden md:flex items-center gap-3 ml-6">
                <button onClick={() => scrollToId("about")} className="text-sm hover:text-teal-400">About</button>
                <button onClick={() => scrollToId("skills")} className="text-sm hover:text-teal-400">Skills</button>
                <button onClick={() => scrollToId("projects")} className="text-sm hover:text-teal-400">Projects</button>
                <button onClick={() => scrollToId("experience")} className="text-sm hover:text-teal-400">Experience</button>
                <button onClick={() => scrollToId("contact")} className="text-sm hover:text-teal-400">Contact</button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a className="hidden md:inline-block text-sm px-3 py-1 rounded-md bg-teal-500 text-black" href="/resume.pdf" download>
                Download Resume
              </a>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-md border border-slate-200 dark:border-slate-700"
                aria-label="toggle theme"
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <header id="hero" className="pt-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="space-y-6"
              >
                <div className="text-teal-400 font-medium">Back-end Engineer</div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  Edwin Siby - Golang
                </h1>

                <p className="text-slate-500 dark:text-slate-300 max-w-xl">
                 Building scalable backend systems using Golang, PostgreSQL, Docker, and AWS, with strong experience in performance optimization, background jobs, CLI tools, and third-party integrations.
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <a href="mailto:edwinsibycareer@gmail.com" className="inline-flex items-center gap-2 bg-teal-500 text-black px-4 py-2 rounded-md font-medium">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                  <a href="https://github.com/Edwinsiby" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/edw1n-siby" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a href="https://edwinsiby.medium.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md">
                    <Camera className="w-4 h-4" /> Medium
                  </a>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
                  <motion.div whileHover={{ y: -6 }} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold">{yearsExperience}+</div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">Years Exp</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -6 }} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold">{projects.length+10}+</div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">Projects</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -6 }} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold">{skills.length+10}+</div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">Techs</div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-end"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border-4 border-teal-500 bg-white/5">
                  {/* Use <Image/> if available; fallback to <img> */}
                  <img
                    src="/profile.jpg"
                    alt="Edwin Siby"
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* ABOUT */}
        <section id="about" className="pt-16 pb-10">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <h2 className="text-2xl font-semibold mb-3">About</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
               Backend Engineer with 2+ years of relevant experience building high-scale, revenue-generating SaaS platforms using Golang, AWS, PostgreSQL and Microservices architecture. Specialized in email automation systems, distributed background jobs, API platforms, and high-reliability data pipelines.Proven record of reducing cloud costs, improving performance, and building systems that directly drive business revenue.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-10 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h3 initial={{opacity:0, y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-xl font-semibold mb-4">Skills</motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skills.map((s, idx) => (
                <motion.div key={s} whileHover={{ scale: 1.02 }} initial="hidden" whileInView="visible" variants={fadeUp} custom={idx} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  {s}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-14">
        <div className="grid md:grid-cols-3 gap-6">
  {projects.map((p, i) => (
    <div   key={p.title}
    className="relative h-[260px] rounded-lg overflow-hidden border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
    onMouseMove={(e) => handleHover(e, i)}
    onMouseLeave={() => setHovered(null)}>

<div className="relative w-full h-full">

  {/* IMAGE LAYER */}
  <motion.div
  animate={{ opacity: hovered === i ? 0 : 1 }}
  transition={{ duration: 0.35 }}
  className={`absolute inset-0 ${
    hovered === i ? "pointer-events-none" : "pointer-events-auto"
  }`}
>

    <div
      className="h-40 cursor-pointer"
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
    >
      <img
        src={p.img}
        alt={p.title}
        className="object-cover w-full h-full"
      />
    </div>

    <div className="p-4">
      <div className="text-teal-400 font-semibold">{p.title}</div>
      <a
        href={p.link}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm text-white-500 hover:text-white-600 transition font-medium"
      >
        View on GitHub
      </a>
    </div>
  </motion.div>

  {/* DESCRIPTION LAYER */}
  <motion.div
  animate={{
    opacity: hovered === i ? 1 : 0,
    y: hovered === i ? 0 : 20,
  }}
  transition={{ duration: 0.35 }}
  className={`absolute inset-0 p-6 bg-slate-100 dark:bg-slate-800 ${
    hovered === i ? "pointer-events-auto" : "pointer-events-none"
  }`}
>

    <h3 className="text-lg font-semibold mb-3">{p.title}</h3>
    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {p.desc}
    </p>
  </motion.div>

</div>
    </div>

  ))}
</div>

        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-12 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-xl font-semibold mb-6">Experience</h3>

            <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="space-y-8">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Backend Engineer — Trademarkia (Legal-Tech | US IP Systems | Scalable Search & Automation)</div>
                    <div className="text-sm text-slate-500 dark:text-slate-300">Dec 2023 – Present • Chennai, India</div>
                  </div>
                </div>
                <ul className="mt-3 text-slate-700 dark:text-slate-300 list-disc ml-5">
                <li>Built and scaled legal-tech backend systems powering a major US intellectual property law firm, integrating directly with USPTO, WIPO, and global IP data sources.</li>
                  <li>Designed high-performance Golang microservices, cron schedulers, scrapers, and data pipelines to automate trademark search, monitoring, and notification workflows.</li>
                  <li>Implemented ElasticSearch-based indexing and search pipelines, improving global trademark discovery speed and query relevance across millions of IP records.</li>
                  <li>Developed a fully automated scraping and ingestion framework for USPTO data, reducing manual legal work by 80% and enabling near real-time updates.</li>
                  <li>Re-architected India → Global IP integration system, reducing rollout time for new legal services from 1 day to 10 minutes through automation and clean API design.</li>
                  <li>Built an in-house email intelligence and revenue tracking platform, eliminating third-party tools and increasing revenue by 25% while cutting recurring costs to zero.</li>
                  <li>Created fault-tolerant schedulers and distributed cron workers for continuous data sync, document parsing, and automated legal-action triggers.</li>
                  <li>Improved system reliability and backend performance by 15% through PostgreSQL optimization, caching strategies, and redesigned concurrency patterns.</li>
                  <li>Mentored backend developers and led infrastructure decisions across AWS (Lambda, S3, RDS, SES, SQS, CloudFront), CI/CD pipelines, and microservice deployments.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-12 border-t border-slate-200 dark:border-slate-700">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>

    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-2">
      Open to full-time roles, backend consulting, and startup collaborations. I usually reply the same day.
    </p>

    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-6">
      Worked across <strong>Bangalore</strong>, <strong>Chennai</strong>, and <strong>Kochi</strong>.  
      Available for <strong>remote</strong>, <strong>hybrid</strong>, and <strong>international opportunities</strong>.  
      Experience consulting with startups and building systems from zero to scale.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* Email */}
      <a
        className="inline-flex items-center gap-2 bg-teal-500 text-black px-4 py-2 rounded-md font-medium hover:bg-teal-600 transition"
        href="mailto:edwinsibycareer@gmail.com"
      >
        <Mail className="w-4 h-4" /> Email
      </a>

      {/* WhatsApp */}
      <a
        className="inline-flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-md font-medium hover:bg-green-600 transition"
        href="https://wa.me/919048402133"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>

      {/* Phone */}
      <a
        className="inline-flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        href="tel:+916360698537"
      >
        Call
      </a>

      {/* Resume */}
      <a
        className="inline-flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        href="/resume.pdf"
        download
      >
        Download Resume
      </a>
    </div>
  </div>
</section>


        <footer className="py-8 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
          © {new Date().getFullYear()} Edwin Siby — Backend Developer.
        </footer>
      </div>
    </>
  );
}
