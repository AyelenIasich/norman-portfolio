export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    cyberlab: 'CyberLab',
    certifications: 'Certifications',
    contact: 'Contact',
  },
  hero: {
    tagline: 'From curiosity to cybersecurity',
    roles: [
      'Cybersecurity Student',
      'Ethical Hacker in Training',
      'CTF Player',
      'Penetration Tester',
    ],
    cta1: 'View My Work',
    cta2: 'Contact Me',
    scroll: 'scroll down',
  },
  about: {
    title: 'About Me',
    subtitle: "Who's behind the terminal?",
    p1: "I'm Norman Iasich, a Cybersecurity student at Teclab (Argentina), currently pursuing my Tecnicatura in Cybersecurity. My passion for digital security started from pure curiosity — how systems work, how they break, and how to protect them.",
    p2: "Beyond formal education, I continuously expand my skills through Platzi and TryHackMe, tackling CTF challenges, structured learning paths, and hands-on labs focused on penetration testing and ethical hacking.",
    stats: [
      { value: '5+', label: 'CTF Machines Solved' },
      { value: '3', label: 'Learning Platforms' },
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
    items: [
      {
        title: 'Homelab SIEM with Splunk',
        short: 'Log monitoring and anomaly detection with pfSense and Snort integrated into a Splunk SIEM homelab.',
        tags: ['Splunk', 'pfSense', 'Snort', 'SIEM'],
        badge: 'Blue Team',
        accent: 'blue' as const,
        category: 'project' as const,
      },
      {
        title: 'TryHackMe — Mr. Robot',
        short: 'Linux machine compromise via WordPress exploitation and SUID privilege escalation.',
        tags: ['Linux', 'WordPress', 'Privilege Escalation', 'CTF'],
        badge: 'CTF',
        accent: 'green' as const,
        category: 'ctf' as const,
        difficulty: 'Medium' as const,
      },
      {
        title: 'WiFi Pentesting with Wifite',
        short: 'PMKID attack on a controlled network using Kali Linux and Wifite in a lab environment.',
        tags: ['Kali Linux', 'Wifite', 'WiFi', 'PMKID'],
        badge: 'Red Team',
        accent: 'gold' as const,
        category: 'lab' as const,
      },
      {
        title: 'TryHackMe — Blue',
        short: 'EternalBlue MS17-010 exploitation with Metasploit to gain SYSTEM-level access.',
        tags: ['Windows', 'Metasploit', 'EternalBlue', 'Exploit'],
        badge: 'CTF',
        accent: 'green' as const,
        category: 'ctf' as const,
        difficulty: 'Easy' as const,
      },
      {
        title: 'Python Recon Script',
        short: 'Automated Nmap scanning with custom HTML report generation for the reconnaissance phase.',
        tags: ['Python', 'Nmap', 'Automation', 'Scripting'],
        badge: 'Blue Team',
        accent: 'blue' as const,
        category: 'project' as const,
      },
      {
        title: 'DVWA Vulnerability Lab',
        short: 'Hands-on practice with SQLi, XSS, and CSRF vulnerabilities using Burp Suite on DVWA.',
        tags: ['Burp Suite', 'SQLi', 'XSS', 'CSRF'],
        badge: 'Red Team',
        accent: 'gold' as const,
        category: 'lab' as const,
      },
    ],
  },
  certifications: {
    title: 'Education & Certifications',
    subtitle: 'My learning journey',
    inProgress: 'In Progress',
    completed: 'Completed',
    items: [
      {
        institution: 'Teclab',
        title: 'Tecnicatura en Ciberseguridad',
        period: '2026 – Present',
        status: 'inProgress' as const,
      },
      {
        institution: 'TryHackMe',
        title: 'Pre-Security Path',
        period: '2026',
        status: 'completed' as const,
      },
      {
        institution: 'TryHackMe',
        title: 'Jr Penetration Tester Path',
        period: '2026 – Present',
        status: 'inProgress' as const,
      },
      {
        institution: 'Platzi',
        title: 'Introduction to Cybersecurity',
        period: '2026',
        status: 'completed' as const,
      },
      {
        institution: 'Platzi',
        title: 'Networking Course',
        period: '2026',
        status: 'completed' as const,
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
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Your message...',
      submit: 'Send Message',
      success: "Message sent! I'll get back to you soon.",
      sendAnother: 'Send another message',
    },
    errors: {
      nameRequired: 'Name is required',
      emailInvalid: 'Please enter a valid email',
      messageRequired: 'Message is required',
    },
  },
  footer: {
    rights: 'All rights reserved.',
    built: 'Built with ❤️ and lots of ☕',
    quickLinks: 'Quick Links',
    connect: 'Connect',
  },
}

export type Translations = typeof en
