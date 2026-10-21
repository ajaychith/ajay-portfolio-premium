export const defaultCMSState = {
  settings: {
    name: "Ajay Chithanoor",
    brand_logo: "Ajay",
    header_avatar: "/Ajay.jpg",
    show_header_avatar: true,
    availability_badge: "Available for Global Projects",
    role: "IT Executive | Cybersecurity Practitioner | AI-Assisted Web Developer",
    tagline: "Computer Science graduate specializing in Cybersecurity, IT operations, website infrastructure, DNS management, and AI-assisted full-stack web development.",
    about_bio: "Currently supporting technology operations at Kanopy Diagnostics across digital systems, website infrastructure, hosting, cybersecurity practices, technical support, and SEO initiatives.",
    resume_url: "/Ajay Chithanoor.pdf",
    github_url: "https://github.com",
    linkedin_url: "https://linkedin.com/in/ajaychithanoor",
    twitter_url: "https://x.com",
    email: "chajay572@gmail.com",
    phone: "+91 90523 44399",
    location: "Hyderabad, Telangana, India"
  },
  background: {
    type: "video",
    video_url: "/ajay-neon.mp4",
    video_mode: "auto",
    image_url: "/Ajay.jpg",
    solid_color: "#07040a",
    gradient_start: "#09040e",
    gradient_mid: "#2a071e",
    gradient_end: "#690826",
    overlay_opacity: 0.65,
    brightness: 1.0,
    contrast: 1.06
  },
  theme: {
    accent_primary: "#ff5522",
    accent_secondary: "#e11d48",
    text_primary: "#ffffff",
    text_muted: "#94a3b8",
    heading_font: "Inter",
    body_font: "Inter",
    button_radius: "999px",
    card_radius: "22px",
    card_blur: "16px",
    section_padding_vw: "4"
  },
  visibility: {
    hero: true,
    hero_strip: true,
    brands: true,
    about: true,
    projects_preview: true,
    workflow: true,
    palette: true,
    skills: true,
    experiences: true,
    services: true,
    certifications: true,
    stats: true,
    studio_banner: true,
    testimonials: true,
    contact: true
  },
  sections: {
    hero: {
      eyebrow: "Hello, I'm Ajay â€”",
      title_line1: "Cybersecurity",
      title_line2: "& Web Architect",
      right_heading: "Securing infrastructure & building modern web solutions.",
      right_subtext: "Combining software development, hosting & DNS management, vulnerability assessment, and AI-assisted workflows to deliver reliable digital operations.",
      strip: [
        { id: 1, num: "#01", title: "Cybersecurity Practitioner & SIEM", icon: "ShieldCheck", enabled: true },
        { id: 2, num: "#02", title: "3D Web & React Architecture", icon: "Code2", enabled: true },
        { id: 3, num: "#03", title: "Hosting, Domain & DNS Ops", icon: "Server", enabled: true },
        { id: 4, num: "#04", title: "AI-Assisted Engineering", icon: "Sparkles", enabled: true }
      ]
    },
    brands: {
      label_line1: "Organizations & Platforms",
      label_line2: "I've Helped Power",
      items: [
        { id: 1, name: "Kanopy Diagnostics", icon: "ShieldCheck", enabled: true },
        { id: 2, name: "Uma Diagnostics", icon: "Database", enabled: true },
        { id: 3, name: "Daikin India", icon: "Layers", enabled: true },
        { id: 4, name: "Cybersecurity & IT", icon: "Terminal", enabled: true }
      ]
    },
    about: {
      tag: "Behind the Architecture",
      heading: "Shaping Secure Digital Systems That Scale",
      bio: "Computer Science graduate specializing in Cybersecurity with hands-on experience across IT operations, React & WordPress development, hosting and DNS management, vulnerability assessment, and SIEM.",
      cta_label: "Let's Build & Secure Your Digital Infrastructure",
      cta_button: "Get in touch"
    },
    workflow: {
      tag: "EXECUTION WORKFLOW",
      heading: "A structured engineering sprint from security audit to live deployment.",
      description: "Every project follows a disciplined lifecycle â€” from infrastructure and vulnerability assessment to UI architecture, DNS/hosting configuration, and automated deployment.",
      steps: [
        { id: 1, label: "Infrastructure & Security Audit", days: "1 day", offset: "0", icon: "Shield", enabled: true },
        { id: 2, label: "System Architecture & DNS Planning", days: "1 day", offset: "10", icon: "Server", enabled: true },
        { id: 3, label: "UI/UX & React Component Design", days: "2 days", offset: "22", icon: "Layout", enabled: true },
        { id: 4, label: "AI-Assisted Full-Stack Development", days: "2 days", offset: "36", icon: "Sparkles", enabled: true },
        { id: 5, label: "Vulnerability Testing & SIEM Setup", days: "2 days", offset: "50", icon: "Lock", enabled: true },
        { id: 6, label: "Production Hosting & SEO Launch", days: "2 days", offset: "62", icon: "Rocket", enabled: true }
      ]
    },
    palette: {
      tag: "DESIGN SYSTEM PALETTE",
      heading: "Engineered for high contrast, zero eye strain, and executive clarity.",
      cards: [
        { id: 1, title: "Obsidian Core", desc: "Used for elevated glassmorphic cards, surface overlays, and subtle depth.", hex: "#1E1E28", rgb: "30 30 40", dot: "#3b0722", enabled: true },
        { id: 2, title: "Pure Titanium", desc: "Primary editorial typography color ensuring crisp contrast and legibility.", hex: "#F5F5FA", rgb: "245 245 250", dot: "#f5f5fa", enabled: true },
        { id: 3, title: "Cyber Crimson", desc: "Signature studio rim-light accent for calls-to-action and interactive highlights.", hex: "#FF5522", rgb: "255 85 34", dot: "#ff5522", enabled: true }
      ]
    },
    stats: {
      stat1_label: "UPTIME & RELIABILITY",
      stat1_value: "99.9%",
      stat1_desc: "Consistent operational availability across managed diagnostic websites, DNS records, and hosting environments.",
      stat2_label: "MODERN ENGINEERING",
      stat2_value: "10x",
      stat2_desc: "Faster prototyping and full-stack delivery powered by AI-assisted workflows, React, and process automation.",
      studio_left: "CYBER",
      studio_right: "STUDIO"
    },
    testimonials: {
      tag: "LEADERSHIP & IMPACT",
      heading: "Operational Excellence Across Teams",
      items: [
        { id: 1, name: "Kanopy Diagnostics Ops", role: "Healthcare Digital Infrastructure", rating: 5, text: "Ajay seamlessly manages our day-to-day website infrastructure, DNS, hosting environments, cybersecurity practices, and technical support.", enabled: true },
        { id: 2, name: "Uma Diagnostics Team", role: "LIMS & Web Modernization", rating: 5, text: "Led our website development, WordPress administration, and custom LIMS web applications using modern AI-assisted workflows.", enabled: true },
        { id: 3, name: "Enterprise Operations", role: "SAP HANA & Process Automation", rating: 5, text: "Combines strong technical troubleshooting with structured documentation, CRM lifecycle management, and security-first thinking.", enabled: true }
      ]
    },
    contact: {
      heading_left: "READY TO SECURE",
      heading_right: "& SCALE YOUR PLATFORM?",
      badge_title: "DIRECT CONSULTATION",
      badge_desc: "Available for IT Executive roles, Cybersecurity, & Full-Stack Web Projects.",
      submit_text: "Submit Consultation Request"
    }
  },
  projects: [
    {
      id: 1,
      title: "Kanopy Diagnostics Digital & Infrastructure Management",
      client: "Kanopy Diagnostics",
      timeline: "August 2026 â€” Present",
      role: "IT Executive",
      description: "Managing website infrastructure, hosting environments, domains, DNS management, technical support, cybersecurity practices, and SEO initiatives for business-critical healthcare services.",
      challenge: "Ensuring high availability, fast page loads, secure domain/DNS routing, and zero downtime across patient-facing diagnostic portals and internal digital systems.",
      solution: "Implemented structured hosting management, proactive DNS monitoring, cybersecurity hardening, and AI-assisted operational workflows to streamline technical support and SEO performance.",
      metrics: "99.9% Uptime â€¢ Hardened DNS & SSL â€¢ Improved Organic SEO Visibility",
      tech_stack: "WordPress â€¢ DNS â€¢ Hosting â€¢ Cybersecurity â€¢ SEO",
      project_skills: ["WordPress Admin", "DNS Management", "Web Hosting", "Cybersecurity", "Technical Support", "SEO Optimization"],
      image_url: "/project1.jpg",
      snapshots: ["/project1.jpg", "/project2.jpg", "/project3.jpg"],
      live_url: "#",
      github_url: "#",
      enabled: true
    },
    {
      id: 2,
      title: "Uma Diagnostics Website & LIMS Platform",
      client: "Uma Diagnostics",
      timeline: "December 2025 â€” July 2026",
      role: "IT Lead",
      description: "Led website development, WordPress administration, hosting infrastructure, DNS/email systems, and custom LIMS web application workflows.",
      challenge: "Modernizing legacy diagnostic workflows and unifying website administration, domain/email reliability, and laboratory information management.",
      solution: "Developed modern LIMS web modules using AI-assisted development and automation workflows while securing WordPress hosting, domains, and DNS infrastructure.",
      metrics: "End-to-End LIMS Automation â€¢ Zero Email/DNS Spoofing â€¢ Full Digital Transformation",
      tech_stack: "React â€¢ WordPress â€¢ AI-Assisted Dev â€¢ SQL â€¢ DNS",
      project_skills: ["React.js", "WordPress", "LIMS Development", "SQL", "DNS & Email Admin", "Cybersecurity"],
      image_url: "/project2.jpg",
      snapshots: ["/project2.jpg", "/project1.jpg", "/project4.jpg"],
      live_url: "#",
      github_url: "#",
      enabled: true
    },
    {
      id: 3,
      title: "3D Interactive Portfolio & Headless CMS Architecture",
      client: "Personal Engineering Showcase",
      timeline: "2026",
      role: "Full-Stack Architect",
      description: "Designed and engineered a full-width 3D/video portfolio with a unified Node.js + MySQL + JSON Headless CMS, real-time theme engine, and permanent media uploader.",
      challenge: "Building an Awwwards-grade interactive portfolio where every single section, project snapshot, icon, and theme variable is editable live without touching code.",
      solution: "Combined React, Vite, custom API middleware, 80+ vector SVG icons, and an executive CMS with live project case-study modals and media management.",
      metrics: "100% Editable A-Z CMS â€¢ 60fps Scroll Animations â€¢ Instant Media Uploads",
      tech_stack: "React â€¢ Vite â€¢ Node.js â€¢ CSS3 â€¢ AI Workflows",
      project_skills: ["React.js", "Vite", "Node.js", "JavaScript", "CSS3", "REST APIs", "Git & GitHub"],
      image_url: "/project3.jpg",
      snapshots: ["/project3.jpg", "/project4.jpg", "/project1.jpg"],
      live_url: "#",
      github_url: "#",
      enabled: true
    }
  ],
  skills: [
    { id: 1, name: "Cybersecurity, VA & SIEM", category: "Security & Risk Management", proficiency: 94, icon: "ShieldCheck", enabled: true },
    { id: 2, name: "HTML5, CSS3 & JavaScript", category: "Core Web Technologies", proficiency: 96, icon: "Code2", enabled: true },
    { id: 3, name: "React.js, Vite & TypeScript", category: "Modern Frontend Engineering", proficiency: 92, icon: "Layers", enabled: true },
    { id: 4, name: "Node.js, Python & SQL", category: "Backend & Data Engineering", proficiency: 90, icon: "Database", enabled: true },
    { id: 5, name: "WordPress, Hosting & DNS", category: "Cloud & Web Infrastructure", proficiency: 96, icon: "Server", enabled: true },
    { id: 6, name: "Git, GitHub & Linux", category: "DevOps & Version Control", proficiency: 92, icon: "GitBranch", enabled: true },
    { id: 7, name: "AI-Assisted Development", category: "Next-Gen Engineering", proficiency: 97, icon: "Sparkles", enabled: true },
    { id: 8, name: "SAP HANA, CRM & IT Ops", category: "Enterprise Systems", proficiency: 89, icon: "Cpu", enabled: true }
  ],
  experiences: [
    { id: 1, role: "IT Executive", company: "Kanopy Diagnostics", duration: "August 2026 â€” Present", description: "Supporting day-to-day technology operations across digital systems, website infrastructure, hosting environments, DNS, cybersecurity practices, technical support, and SEO initiatives.", enabled: true },
    { id: 2, role: "IT Lead", company: "Uma Diagnostics", duration: "December 2025 â€” July 2026", description: "Led website development, WordPress administration, hosting, domains, DNS, email systems, and developed LIMS web applications using AI-assisted workflows.", enabled: true },
    { id: 3, role: "AMC Executive", company: "Daikin Air-Conditioning India Pvt. Ltd.", duration: "November 2024 â€” May 2025", description: "Managed AMC lifecycle, customer service operations, SAP HANA and CRM records, technician schedules, and operational reporting.", enabled: true },
    { id: 4, role: "Logistics Supervisor", company: "FreshToHome", duration: "May 2023 â€” September 2025", description: "Managed inventory operations, dispatch readiness, operational teams, and process-improvement initiatives.", enabled: true }
  ],
  services: [
    { id: 1, title: "Cybersecurity & Vulnerability Assessment", description: "SIEM monitoring, risk management, network security hardening, and operational security audits.", icon: "ShieldCheck", enabled: true },
    { id: 2, title: "Full-Stack Web & React Development", description: "Custom React.js, Vite, WordPress, and LIMS web applications built with AI-assisted precision.", icon: "Code2", enabled: true },
    { id: 3, title: "Web Hosting, Domain & DNS Architecture", description: "End-to-end server administration, DNS routing, email security, SSL, and technical operations.", icon: "Server", enabled: true }
  ],
  certifications: [
    { id: 1, title: "Google Cybersecurity Foundations", issuer: "Google Career Certificates", year: "2024", icon: "ShieldCheck", enabled: true },
    { id: 2, title: "Google Risk Management", issuer: "Google Career Certificates", year: "2024", icon: "Lock", enabled: true },
    { id: 3, title: "Google Cybersecurity Professional Certificate", issuer: "Coursework & Hands-On Labs", year: "2024", icon: "Award", enabled: true },
    { id: 4, title: "B.Tech in CSE (Cybersecurity)", issuer: "Swami Vivekananda Institute of Engineering & Tech", year: "2024", icon: "Trophy", enabled: true }
  ],
  media: [
    { id: 1, name: "Ajay Portrait", url: "/Ajay.jpg", type: "image" },
    { id: 2, name: "Ajay Neon Studio Video", url: "/ajay-neon.mp4", type: "video" },
    { id: 3, name: "Project 1 Showcase", url: "/project1.jpg", type: "image" },
    { id: 4, name: "Project 2 Showcase", url: "/project2.jpg", type: "image" },
    { id: 5, name: "Project 3 Showcase", url: "/project3.jpg", type: "image" },
    { id: 6, name: "Project 4 Showcase", url: "/project4.jpg", type: "image" }
  ],
  messages: []
};