import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Norman Iasich | Cybersecurity Portfolio',
  description:
    'Cybersecurity student specializing in penetration testing and ethical hacking. From curiosity to cybersecurity.',
  keywords: ['cybersecurity', 'pentesting', 'ethical hacking', 'CTF', 'portfolio'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var ua=navigator.userAgent;if(/android/i.test(ua)){document.documentElement.style.fontSize='14px';}else{document.documentElement.style.fontSize='16px';}})();`,
          }}
        />
      </head>
      <body className="bg-dark text-snow font-inter antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
