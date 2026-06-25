// Single source of truth for certifications (language-independent data).
// Localized `title` / `period` live in translations/es.ts & en.ts, matched by `id`.
//
// Each certification can combine any of these:
//   image     -> screenshot/PNG shown in the lightbox modal (the preview)
//   verifyUrl -> official verification link (opens in a new tab)
//   pdf        -> original PDF, offered as a download inside the modal
//
// Drop image/pdf files into `public/certificates/` and reference them with a
// path relative to `public/`, e.g. `/certificates/my-cert.png`.
//
// If a cert has no `image` but has a `verifyUrl`, the card links straight out
// to verify. If it has none of them, it shows a "coming soon" state.

export interface Certification {
  id: string
  institution: string
  status: 'completed' | 'inProgress'
  /** Screenshot/PNG of the certificate, shown in the modal. */
  image?: string
  /** Official verification page (TryHackMe / Platzi / Teclab ...). */
  verifyUrl?: string
  /** Original PDF, offered as a download inside the modal. */
  pdf?: string
}

export const certifications: Certification[] = [
  {
    id: 'thm-presecurity',
    institution: 'TryHackMe',
    status: 'completed',
    image: '/certificates/thm-presecurity.png',
    verifyUrl: 'https://tryhackme.com/certificate/THM-V5JYXP9QZW',
  },
  {
    id: 'thm-jr-pentester',
    institution: 'TryHackMe',
    status: 'inProgress',
  },
  {
    id: 'platzi-intro-ciber',
    institution: 'Platzi',
    status: 'completed',
    image: '/certificates/platzi-intro-ciber.png',
    verifyUrl: 'https://platzi.com/p/normaniasich/curso/12840-ciberseguridad/diploma/detalle/',
  },
  {
    id: 'platzi-redes',
    institution: 'Platzi',
    status: 'completed',
    image: '/certificates/platzi-redes.png',
    verifyUrl: 'https://platzi.com/p/normaniasich/curso/2225-redes/diploma/detalle/',
  },
  {
    id: 'platzi-terminal',
    institution: 'Platzi',
    status: 'completed',
    image: '/certificates/platzi-terminal.png',
    verifyUrl: 'https://platzi.com/p/normaniasich/curso/12040-terminal/diploma/detalle/',
  },
  {
    id: 'platzi-computacion',
    institution: 'Platzi',
    status: 'completed',
    image: '/certificates/platzi-computacion-basica.png',
    verifyUrl: 'https://platzi.com/p/normaniasich/curso/2793-computacion-basica/diploma/detalle/',
  },
]
