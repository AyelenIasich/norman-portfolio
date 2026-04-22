import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { Providers } from './providers'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Norman Iasich | Cybersecurity Portfolio',
  description:
    'Cybersecurity student specializing in penetration testing, ethical hacking, and CTF challenges. From curiosity to cybersecurity.',
  keywords: ['cybersecurity', 'pentesting', 'ethical hacking', 'CTF', 'portfolio', 'Norman Iasich'],
  authors: [{ name: 'Norman Iasich' }],
  openGraph: {
    title: 'Norman Iasich | Cybersecurity Portfolio',
    description:
      'Cybersecurity student specializing in penetration testing and ethical hacking.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Norman Iasich Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Norman Iasich | Cybersecurity Portfolio',
    description:
      'Cybersecurity student specializing in penetration testing and ethical hacking.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head />
      <body className="bg-dark text-snow font-mono antialiased">
        <LanguageProvider>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  )
}
