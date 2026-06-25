import type { Translations } from './en'

export const es: Translations = {
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    cyberlab: 'CyberLab',
    education: 'Educación',
    certifications: 'Certificaciones',
    contact: 'Contacto',
  },
  hero: {
    tagline: 'De la curiosidad a la ciberseguridad',
    roles: [
      'Estudiante de Ciberseguridad',
      'Ethical Hacker en Formación',
      'Jugador de CTF',
      'Pentester',
    ],
    cta1: 'Ver Proyectos',
    cta2: 'Contactarme',
    scroll: 'desplazar',
    sectionLabel: 'Perfil de seguridad',
    subtitle: 'Pentesting · Networking · Sistemas Linux.',
    panel: {
      specialization: 'Especialización',
      stack: 'Stack activo',
      platforms: 'Plataformas',
      platformsList: 'TryHackMe · CyLab · HackTheBox',
      status: 'Estado',
      available: 'Disponible para oportunidades',
      tags: ['Pentesting', 'Red Team', 'Networking', 'Kali Linux', 'CTF'],
      bars: [
        { name: 'Linux',       pct: 88 },
        { name: 'Redes',       pct: 75 },
        { name: 'Pentesting',  pct: 62 },
        { name: 'Scripting',   pct: 55 },
      ],
    },
  },
  about: {
    title: 'Sobre Mí',
    subtitle: '¿Quién está detrás de la terminal?',
    p1: 'Soy Norman Iasich, estudiante de Ciberseguridad en Teclab (Argentina), cursando la Tecnicatura en Ciberseguridad. Mi pasión por la seguridad digital comenzó por pura curiosidad — cómo funcionan los sistemas, cómo se rompen y cómo protegerlos.',
    p2: 'Más allá de la formación académica, expando continuamente mis habilidades en Platzi y TryHackMe, resolviendo desafíos CTF, rutas de aprendizaje y laboratorios prácticos enfocados en pentesting y ethical hacking.',
    stats: [
      { value: '5+', label: 'Máquinas CTF Resueltas' },
      { value: '3', label: 'Plataformas de Aprendizaje' },
      { value: '1', label: 'Carrera en Curso' },
    ],
  },
  skills: {
    title: 'Habilidades',
    subtitle: 'Mi kit de herramientas técnicas',
    categories: [
      {
        name: 'Seguridad Ofensiva',
        skills: [
          { name: 'Penetration Testing', level: 75 },
          { name: 'Ethical Hacking', level: 70 },
          { name: 'Análisis de Vulnerabilidades', level: 72 },
        ],
      },
      {
        name: 'Herramientas',
        skills: [
          { name: 'Kali Linux', level: 80 },
          { name: 'Nmap', level: 78 },
          { name: 'Burp Suite', level: 65 },
          { name: 'Metasploit', level: 60 },
          { name: 'Wireshark', level: 70 },
        ],
      },
      {
        name: 'Fundamentos',
        skills: [
          { name: 'Linux', level: 82 },
          { name: 'Redes', level: 70 },
          { name: 'Seguridad Web', level: 65 },
        ],
      },
    ],
  },
  projects: {
    title: 'Proyectos',
    subtitle: 'Trabajo práctico en ciberseguridad',
    readMore: 'Leer Más',
    readLess: 'Mostrar Menos',
    items: [
      {
        title: 'TryHackMe — Mr. Robot Room',
        short: 'Comprometí una máquina Linux inspirada en la serie Mr. Robot.',
        description:
          'Comprometí una máquina Linux inspirada en la serie Mr. Robot. Exploté una vulnerabilidad de WordPress para obtener acceso inicial, escaleé privilegios usando binarios SUID y recuperé las 3 flags. Requirió enumeración cuidadosa, explotación web y escalada de privilegios local.',
        tags: ['Linux', 'WordPress', 'Escalada de Privilegios', 'CTF'],
        badge: 'TryHackMe',
        accent: 'teal',
      },
      {
        title: 'TryHackMe — Blue Room (EternalBlue)',
        short: 'Exploté la vulnerabilidad MS17-010 EternalBlue en Windows 7.',
        description:
          'Exploté la vulnerabilidad MS17-010 EternalBlue en una máquina Windows 7 con Metasploit. Obtuve acceso a nivel SYSTEM y extraje hashes de contraseñas con Mimikatz. Demuestra el impacto crítico de los sistemas sin parchear.',
        tags: ['Windows', 'Metasploit', 'EternalBlue', 'Exploit'],
        badge: 'TryHackMe',
        accent: 'gold',
      },
      {
        title: 'Web Vulnerability Lab — DVWA',
        short: 'Practiqué vulnerabilidades web comunes en DVWA usando Burp Suite.',
        description:
          'Practiqué y documenté vulnerabilidades web comunes en DVWA: Inyección SQL, XSS, CSRF y exploits de subida de archivos. Usé Burp Suite como proxy interceptor. Creé documentación detallada con cada vulnerabilidad, su impacto y estrategias de remediación.',
        tags: ['Seguridad Web', 'SQLi', 'XSS', 'Burp Suite'],
        badge: 'Personal Lab',
        accent: 'teal',
      },
      {
        title: 'Script de Reconocimiento de Red',
        short: 'Script Python que combina escaneo Nmap con reportes HTML personalizados.',
        description:
          'Desarrollé un script de automatización en Python que combina escaneo Nmap con reportes personalizados. Genera reportes HTML con puertos abiertos, servicios activos y posibles vulnerabilidades. Automatiza la fase inicial de reconocimiento y produce salida accionable.',
        tags: ['Python', 'Nmap', 'Automatización', 'Scripting'],
        badge: 'GitHub',
        accent: 'gold',
      },
    ],
  },
  cyberlab: {
    title: 'CyberLab',
    subtitle: 'Proyectos de seguridad, labs y write-ups de CTFs',
    filters: {
      all: 'Todos',
      projects: 'Proyectos / Homelabs',
      labs: 'Labs',
      ctfs: 'CTFs',
    },
    viewWriteup: 'Ver Write-up',
    viewDocs: 'Ver Documentación',
    viewMethodology: 'Ver Metodología',
    difficulty: 'Dificultad',
  },
  education: {
    title: 'Educación',
    subtitle: 'Mi formación académica formal',
    inProgress: 'En Curso',
    completed: 'Completado',
    items: [
      {
        institution: 'Teclab',
        degree: 'Técnico Superior en Ciberseguridad',
        period: '2026 – Presente',
        status: 'inProgress' as const,
      },
    ],
  },
  certifications: {
    title: 'Certificaciones',
    subtitle: 'Plataformas y cursos completados',
    inProgress: 'En Curso',
    completed: 'Completado',
    view: 'Ver certificado',
    download: 'Descargar',
    verify: 'Verificar',
    comingSoon: 'Próximamente',
    close: 'Cerrar',
    items: [
      {
        id: 'thm-presecurity',
        title: 'Pre-Security Path',
        period: 'Mayo 2026',
      },
      {
        id: 'thm-jr-pentester',
        title: 'Jr Penetration Tester Path',
        period: '2026 – Presente',
      },
      {
        id: 'platzi-intro-ciber',
        title: 'Ciberseguridad Preventiva',
        period: 'Abril 2026',
      },
      {
        id: 'platzi-redes',
        title: 'Redes Informáticas de Internet',
        period: 'Abril 2026',
      },
      {
        id: 'platzi-terminal',
        title: 'Introducción a la Terminal y Línea de Comandos',
        period: 'Marzo 2026',
      },
      {
        id: 'platzi-computacion',
        title: 'Computación Básica',
        period: 'Febrero 2026',
      },
    ],
  },
  contact: {
    title: 'Ponerse en Contacto',
    subtitle: 'Conectemos y hablemos de seguridad',
    description:
      'Ya sea para colaborar en un CTF, hablar de ciberseguridad o simplemente saludar — mi inbox siempre está abierto.',
    social: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
      tryhackme: 'TryHackMe',
      email: 'Email',
    },
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    built: 'Hecho con ❤️ y mucho ☕',
    quickLinks: 'Links Rápidos',
    connect: 'Conectar',
  },
  timeline: {
    title: 'Trayectoria',
    subtitle: 'Mi camino en ciberseguridad',
    categories: {
      education: 'Educación',
      certification: 'Certificación',
      ctf: 'CTF',
      milestone: 'Hito',
    },
    events: [
      { title: 'Inicio de la Carrera',                description: 'Comienzo del Técnico Superior en Ciberseguridad en Teclab, Argentina' },
      { title: 'Platzi: Introducción a Ciberseguridad', description: 'Completé el curso introductorio de ciberseguridad en Platzi' },
      { title: 'Platzi: Curso de Redes',              description: 'Completé el curso de fundamentos de redes' },
      { title: 'TryHackMe: Pre-Security Path',        description: 'Completé el camino de aprendizaje Pre-Security en TryHackMe' },
      { title: 'Primer CTF Completado',               description: 'Comprometí exitosamente mi primera máquina en TryHackMe (Blue Room)' },
      { title: 'TryHackMe: Jr Penetration Tester',    description: 'Actualmente cursando el camino Jr Penetration Tester' },
    ],
  },
  skillTree: {
    title: 'Árbol de Habilidades',
    subtitle: 'Desbloquea tu potencial - estilo RPG',
    categories: {
      offensive: 'Ofensivo',
      defensive: 'Defensivo',
      tools: 'Herramientas',
      fundamentals: 'Fundamentos',
    },
  },
  writeups: {
    title: 'CTF Writeups',
    subtitle: 'Walkthroughs detallados de desafíos de seguridad',
    searchPlaceholder: 'Buscar writeups o tags...',
    noResults: 'No se encontraron writeups con esos filtros.',
    filters: {
      allPlatforms: 'Todas las plataformas',
      allDifficulties: 'Todas las dificultades',
      allCategories: 'Todas las categorías',
    },
  },
  terminal: {
    welcome: 'Bienvenido al Terminal NI-PORTFOLIO v2.0',
    helpHint: 'Escribí "help" para ver los comandos',
    placeholder: "Escribí 'help' para comandos...",
  },
  commandPalette: {
    placeholder: 'Escribí un comando o buscá...',
    noResults: 'No se encontraron comandos',
    categories: {
      navigation: 'Navegación',
      theme: 'Tema',
      language: 'Idioma',
      tools: 'Herramientas',
    },
  },
  toast: {
    messageSent: '¡Mensaje enviado!',
    messageSentDesc: 'Me pondré en contacto pronto.',
    languageChanged: 'Idioma cambiado',
    hackerMode: 'Modo hacker activado',
    hackerModeOff: 'Modo hacker desactivado',
  },
  theme: {
    hackerMode: 'Modo Hacker',
    defaultMode: 'Modo Normal',
  },
}
