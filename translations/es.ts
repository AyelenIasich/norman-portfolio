import type { Translations } from './en'

export const es: Translations = {
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
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
  certifications: {
    title: 'Educación y Certificaciones',
    subtitle: 'Mi camino de aprendizaje',
    inProgress: 'En Curso',
    completed: 'Completado',
    items: [
      {
        institution: 'Teclab',
        title: 'Tecnicatura en Ciberseguridad',
        period: '2024 – 2026',
        status: 'inProgress' as const,
      },
      {
        institution: 'TryHackMe',
        title: 'Pre-Security Path',
        period: '2024',
        status: 'completed' as const,
      },
      {
        institution: 'TryHackMe',
        title: 'Jr Penetration Tester Path',
        period: '2024 – Presente',
        status: 'inProgress' as const,
      },
      {
        institution: 'Platzi',
        title: 'Introducción a la Ciberseguridad',
        period: '2024',
        status: 'completed' as const,
      },
      {
        institution: 'Platzi',
        title: 'Curso de Redes',
        period: '2024',
        status: 'completed' as const,
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
    form: {
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      messagePlaceholder: 'Tu mensaje...',
      submit: 'Enviar Mensaje',
      success: '¡Mensaje enviado! Me pondré en contacto pronto.',
      sendAnother: 'Enviar otro mensaje',
    },
    errors: {
      nameRequired: 'El nombre es obligatorio',
      emailInvalid: 'Ingresá un email válido',
      messageRequired: 'El mensaje es obligatorio',
    },
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    built: 'Hecho con ❤️ y mucho ☕',
    quickLinks: 'Links Rápidos',
    connect: 'Conectar',
  },
}
