// Single source of truth for certifications (language-independent data).
// Localized `title` / `period` live in translations/es.ts & en.ts, matched by `id`.
//
// To attach a viewable document, set `document` to one of:
//   { type: 'image', src: '/certificates/my-cert.png' }   -> opens in lightbox modal
//   { type: 'pdf',   src: '/certificates/my-cert.pdf' }    -> opens in lightbox modal + download
//   { type: 'link',  src: 'https://tryhackme.com/...' }     -> opens in a new tab (verify badge)
//   null                                                    -> shows a "coming soon" disabled state
//
// Drop image/pdf files into the `public/certificates/` folder.

export type CertDocument =
  | { type: 'image'; src: string }
  | { type: 'pdf'; src: string }
  | { type: 'link'; src: string }
  | null

export interface Certification {
  id: string
  institution: string
  status: 'completed' | 'inProgress'
  document: CertDocument
}

export const certifications: Certification[] = [
  {
    id: 'thm-presecurity',
    institution: 'TryHackMe',
    status: 'completed',
    // Sample certificate (replace with your real file when you have it).
    document: { type: 'image', src: '/certificates/thm-presecurity.svg' },
  },
  {
    id: 'thm-jr-pentester',
    institution: 'TryHackMe',
    status: 'inProgress',
    document: null,
  },
  {
    id: 'platzi-intro-ciber',
    institution: 'Platzi',
    status: 'completed',
    // e.g. { type: 'image', src: '/certificates/platzi-intro-ciber.png' }
    document: null,
  },
  {
    id: 'platzi-redes',
    institution: 'Platzi',
    status: 'completed',
    document: null,
  },
]
