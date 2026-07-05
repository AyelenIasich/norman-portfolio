export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    cyberlab: 'CyberLab',
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact',
  },
  hero: {
    tagline: 'From curiosity to cybersecurity',
    roles: [
      'Cybersecurity Student',
      'Ethical Hacker in Training',
      'CTF Player',
      'Penetration Tester in Training',
    ],
    cta1: 'View My Work',
    cta2: 'Contact Me',
    scroll: 'scroll down',
    sectionLabel: 'Security Profile',
    subtitle: 'Pentesting · Networking · Linux Systems.',
    panel: {
      specialization: 'Specialization',
      stack: 'Active Stack',
      platforms: 'Platforms',
      platformsList: 'TryHackMe · CyLab · HackTheBox',
      status: 'Status',
      available: 'Available for opportunities',
      tags: ['Pentesting', 'Red Team'],
      bars: [
        { name: 'Linux',       pct: 88 },
        { name: 'Networking',  pct: 75 },
        { name: 'Pentesting',  pct: 62 },
        { name: 'Scripting',   pct: 55 },
      ],
    },
  },
  about: {
    title: 'About Me',
    subtitle: "Who's behind the terminal?",
    p1: "I'm Norman Iasich, a student of the Higher Technical Degree in Cybersecurity at Teclab (Argentina), where I'm building the technical fundamentals of the field.",
    p2: "My interest in security grew from wanting to understand how systems work in depth — and from there, how they're protected and how they break. On that academic base, I'm independently building a focus on Red Team and Cloud Pentesting through active practice on TryHackMe, PicoCTF, and Hack The Box, solving CTFs and labs on both the offensive and defensive sides.",
    p3: "I also build my own labs to replicate real environments where I can experiment without restrictions — servers, network services, and infrastructure in general. I document every lesson with structured technical writeups, aiming to develop real expertise beyond the degree.",
    stats: [
      { value: '∞', label: 'Learning Platforms' },
      { value: '1', label: 'Degree in Progress' },
    ],
  },
  skills: {
    title: 'Skills',
    subtitle: 'My technical toolkit',
    categories: [
      {
        name: 'Offensive Security',
        skills: [
          { name: 'Penetration Testing', level: 75 },
          { name: 'Ethical Hacking', level: 70 },
          { name: 'Vulnerability Analysis', level: 72 },
        ],
      },
      {
        name: 'Tools',
        skills: [
          { name: 'Kali Linux', level: 80 },
          { name: 'Nmap', level: 78 },
          { name: 'Burp Suite', level: 65 },
          { name: 'Metasploit', level: 60 },
          { name: 'Wireshark', level: 70 },
        ],
      },
      {
        name: 'Fundamentals',
        skills: [
          { name: 'Linux', level: 82 },
          { name: 'Networking', level: 70 },
          { name: 'Web Security', level: 65 },
        ],
      },
    ],
  },
  projects: {
    title: 'Projects',
    subtitle: 'Hands-on cybersecurity work',
    readMore: 'Read More',
    readLess: 'Show Less',
    items: [
      {
        title: 'TryHackMe — Mr. Robot Room',
        short: 'Compromised a Linux machine inspired by the Mr. Robot series.',
        description:
          'Compromised a Linux machine inspired by the Mr. Robot series. Exploited a WordPress vulnerability to gain initial access, escalated privileges using SUID binaries, and retrieved all 3 flags. Required careful enumeration, web exploitation, and local privilege escalation.',
        tags: ['Linux', 'WordPress', 'Privilege Escalation', 'CTF'],
        badge: 'TryHackMe',
        accent: 'teal',
      },
      {
        title: 'TryHackMe — Blue Room (EternalBlue)',
        short: 'Exploited the MS17-010 EternalBlue vulnerability on Windows 7.',
        description:
          'Exploited the MS17-010 EternalBlue vulnerability on a Windows 7 machine using Metasploit. Gained SYSTEM-level access and extracted password hashes with Mimikatz. Demonstrates the critical impact of unpatched systems and the importance of timely security updates.',
        tags: ['Windows', 'Metasploit', 'EternalBlue', 'Exploit'],
        badge: 'TryHackMe',
        accent: 'gold',
      },
      {
        title: 'Web Vulnerability Lab — DVWA',
        short: 'Practiced common web vulnerabilities on DVWA using Burp Suite.',
        description:
          'Practiced and documented common web vulnerabilities on DVWA including SQL Injection, XSS, CSRF, and File Upload exploits. Used Burp Suite as an intercepting proxy for analysis. Created detailed write-ups covering each vulnerability, its impact, and remediation strategies.',
        tags: ['Web Security', 'SQLi', 'XSS', 'Burp Suite'],
        badge: 'Personal Lab',
        accent: 'teal',
      },
      {
        title: 'Network Reconnaissance Script',
        short: 'Python script that combines Nmap scanning with custom HTML reporting.',
        description:
          'Developed a Python automation script combining Nmap scanning with custom reporting. Generates HTML reports detailing open ports, running services, and potential vulnerabilities. Automates the initial reconnaissance phase and produces actionable output for further manual analysis.',
        tags: ['Python', 'Nmap', 'Automation', 'Scripting'],
        badge: 'GitHub',
        accent: 'gold',
      },
    ],
  },
  cyberlab: {
    title: 'CyberLab',
    subtitle: 'Security projects, labs & CTF write-ups',
    filters: {
      all: 'All',
      projects: 'Projects / Homelabs',
      labs: 'Labs',
      ctfs: 'CTFs',
    },
    viewWriteup: 'View Write-up',
    viewDocs: 'View Documentation',
    viewMethodology: 'View Methodology',
    difficulty: 'Difficulty',
  },
  education: {
    title: 'Education',
    subtitle: 'My formal academic path',
    inProgress: 'In Progress',
    completed: 'Completed',
    items: [
      {
        institution: 'Teclab',
        degree: 'Técnico Superior en Ciberseguridad',
        period: '2026 – Present',
        status: 'inProgress' as const,
      },
    ],
  },
  certifications: {
    title: 'Certifications',
    subtitle: 'Platforms & courses completed',
    inProgress: 'In Progress',
    completed: 'Completed',
    view: 'View certificate',
    download: 'Download',
    verify: 'Verify',
    comingSoon: 'Coming soon',
    close: 'Close',
    items: [
      {
        id: 'thm-presecurity',
        title: 'Pre-Security Path',
        period: 'May 2026',
      },
      {
        id: 'thm-jr-pentester',
        title: 'Jr Penetration Tester Path',
        period: '2026 – Present',
      },
      {
        id: 'platzi-ingenieria',
        title: 'Software Engineering Fundamentals',
        period: 'July 2026',
      },
      {
        id: 'platzi-intro-ciber',
        title: 'Preventive Cybersecurity',
        period: 'April 2026',
      },
      {
        id: 'platzi-redes',
        title: 'Computer Networks & the Internet',
        period: 'April 2026',
      },
      {
        id: 'platzi-terminal',
        title: 'Introduction to the Terminal & Command Line',
        period: 'March 2026',
      },
      {
        id: 'platzi-computacion',
        title: 'Basic Computing',
        period: 'February 2026',
      },
    ],
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "Let's connect and talk security",
    description:
      'Whether you want to collaborate on a CTF, discuss cybersecurity, or just say hello — my inbox is always open.',
    social: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
      tryhackme: 'TryHackMe',
      email: 'Email',
    },
  },
  footer: {
    rights: 'All rights reserved.',
    built: 'Built with ❤️ and lots of ☕',
    quickLinks: 'Quick Links',
    connect: 'Connect',
  },
  timeline: {
    title: 'Journey',
    subtitle: 'My path in cybersecurity',
    categories: {
      education: 'Education',
      certification: 'Certification',
      ctf: 'CTF',
      milestone: 'Milestone',
    },
    events: [
      { title: 'Started Cybersecurity Degree',       description: 'Began Técnico Superior en Ciberseguridad at Teclab, Argentina' },
      { title: 'Platzi: Intro to Cybersecurity',     description: 'Completed introductory cybersecurity course on Platzi' },
      { title: 'Platzi: Networking Course',          description: 'Completed networking fundamentals course' },
      { title: 'TryHackMe: Pre-Security Path',       description: 'Completed Pre-Security learning path on TryHackMe' },
      { title: 'First CTF Completed',                description: 'Successfully rooted first TryHackMe machine (Blue Room)' },
      { title: 'TryHackMe: Jr Penetration Tester',   description: 'Currently pursuing Jr Penetration Tester path' },
    ],
  },
  skillTree: {
    title: 'Skill Tree',
    subtitle: 'Unlock your potential - RPG style',
    categories: {
      offensive: 'Offensive',
      defensive: 'Defensive',
      tools: 'Tools',
      fundamentals: 'Fundamentals',
    },
  },
  writeups: {
    title: 'CTF Writeups',
    subtitle: 'Detailed walkthroughs of security challenges',
    searchPlaceholder: 'Search writeups or tags...',
    noResults: 'No writeups found matching your filters.',
    filters: {
      allPlatforms: 'All platforms',
      allDifficulties: 'All difficulties',
      allCategories: 'All categories',
    },
  },
  terminal: {
    welcome: 'Welcome to NI-PORTFOLIO Terminal v2.0',
    helpHint: 'Type "help" to see available commands',
    placeholder: "Type 'help' for commands...",
  },
  commandPalette: {
    placeholder: 'Type a command or search...',
    noResults: 'No commands found',
    categories: {
      navigation: 'Navigation',
      theme: 'Theme',
      language: 'Language',
      tools: 'Tools',
    },
  },
  toast: {
    messageSent: 'Message sent!',
    messageSentDesc: "I'll get back to you soon.",
    languageChanged: 'Language changed',
    hackerMode: 'Hacker mode activated',
    hackerModeOff: 'Hacker mode deactivated',
  },
  theme: {
    hackerMode: 'Hacker Mode',
    defaultMode: 'Default Mode',
  },
}

export type Translations = typeof en
