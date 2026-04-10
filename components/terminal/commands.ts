export interface Command {
  name: string
  description: string
  execute: (args: string[]) => string | string[]
}

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: () => [
      'Available commands:',
      '',
      '  help          Show this help message',
      '  clear         Clear terminal',
      '  whoami        Display user info',
      '  ls            List sections',
      '  cat [file]    Display file contents',
      '  skills        Show skills',
      '  projects      List projects',
      '  contact       Show contact info',
      '  goto [section] Navigate to section',
      '  matrix        Toggle matrix mode',
      '',
      'Type "help" for more info.',
    ],
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal',
    execute: () => 'CLEAR',
  },

  whoami: {
    name: 'whoami',
    description: 'Display user info',
    execute: () => [
      '╔════════════════════════════════════════╗',
      '║  Norman Iasich                         ║',
      '║  Cybersecurity Student                  ║',
      '║  Ethical Hacker in Training             ║',
      '╚════════════════════════════════════════╝',
      '',
      'From curiosity to cybersecurity.',
      'Passionate about pentesting, CTFs, and',
      'protecting digital systems.',
    ],
  },

  ls: {
    name: 'ls',
    description: 'List sections',
    execute: () => [
      'drwxr-xr-x  about/',
      'drwxr-xr-x  skills/',
      'drwxr-xr-x  projects/',
      'drwxr-xr-x  certifications/',
      'drwxr-xr-x  contact/',
      '-rw-r--r--  README.txt',
      '',
      'Use "cat [folder]/README.txt" for details',
    ],
  },

  cat: {
    name: 'cat',
    description: 'Display file contents',
    execute: (args: string[]) => {
      const file = args[0]?.toLowerCase() || ''

      const files: Record<string, string[]> = {
        'about/readme.txt': [
          'ABOUT ME',
          '════════',
          '',
          'Cybersecurity student at Teclab (Argentina).',
          'Currently pursuing Tecnicatura in Cybersecurity.',
          '',
          'Learning through:',
          '  • Platzi courses',
          '  • TryHackMe paths',
          '  • CTF challenges',
          '  • Homelabs',
        ],
        'skills/readme.txt': [
          'SKILLS OVERVIEW',
          '═══════════════',
          '',
          'Offensive Security:',
          '  - Penetration Testing',
          '  - Ethical Hacking',
          '  - Vulnerability Analysis',
          '',
          'Tools:',
          '  - Kali Linux, Nmap, Metasploit',
          '  - Burp Suite, Wireshark',
          '',
          'Type "skills" for detailed view.',
        ],
        'projects/readme.txt': [
          'PROJECTS',
          '════════',
          '',
          '1. TryHackMe - Mr. Robot Room',
          '2. TryHackMe - Blue Room (EternalBlue)',
          '3. Web Vulnerability Lab - DVWA',
          '4. Network Reconnaissance Script',
          '',
          'Type "projects" for details.',
        ],
        'certifications/readme.txt': [
          'CERTIFICATIONS',
          '═══════════════',
          '',
          '✓ TryHackMe: Pre-Security Path',
          '✓ TryHackMe: Jr Penetration Tester (in progress)',
          '✓ Platzi: Intro to Cybersecurity',
          '✓ Platzi: Networking Course',
          '',
          'Currently studying:',
          '  Tecnicatura en Ciberseguridad @ Teclab',
        ],
        'contact/readme.txt': [
          'CONTACT',
          '═══════',
          '',
          'Email:    normaniasich@gmail.com',
          'GitHub:   github.com/normania',
          'LinkedIn: linkedin.com/in/norman-iasich',
          'TryHackMe: tryhackme.com/p/baton.',
          '',
          'Open for opportunities!',
        ],
        'readme.txt': [
          'PORTFOLIO README',
          '════════════════',
          '',
          'Welcome to my cybersecurity portfolio!',
          '',
          'Use "ls" to explore sections.',
          'Use "goto [section]" to navigate.',
          'Use "matrix" to toggle visual effects.',
          '',
          'Happy hacking! 🚩',
        ],
      }

      if (files[file]) {
        return files[file]
      }

      if (!file) {
        return ['Usage: cat [filename]', 'Try: cat README.txt']
      }

      return [`cat: ${file}: No such file or directory`]
    },
  },

  skills: {
    name: 'skills',
    description: 'Show skills',
    execute: () => [
      'TECHNICAL SKILLS',
      '════════════════',
      '',
      '┌─ Offensive Security ─────────────┐',
      '│ Penetration Testing    ████████░░ 80% │',
      '│ Ethical Hacking        ███████░░░ 70% │',
      '│ Vulnerability Analysis ████████░░ 75% │',
      '└──────────────────────────────────┘',
      '',
      '┌─ Tools & Platforms ──────────────┐',
      '│ Kali Linux             █████████░ 85% │',
      '│ Nmap                   ████████░░ 80% │',
      '│ Burp Suite             ██████░░░░ 65% │',
      '│ Metasploit             █████░░░░░ 60% │',
      '│ Wireshark              ███████░░░ 70% │',
      '└──────────────────────────────────┘',
      '',
      '┌─ Fundamentals ───────────────────┐',
      '│ Linux                  █████████░ 85% │',
      '│ Networking             ███████░░░ 70% │',
      '│ Web Security           ██████░░░░ 65% │',
      '└──────────────────────────────────┘',
    ],
  },

  projects: {
    name: 'projects',
    description: 'List projects',
    execute: () => [
      'PROJECTS & CTFs',
      '═══════════════',
      '',
      '[1] Mr. Robot Room (TryHackMe)',
      '    WordPress exploitation, SUID privilege escalation',
      '',
      '[2] Blue Room - EternalBlue (TryHackMe)',
      '    MS17-010 exploit, SYSTEM access with Mimikatz',
      '',
      '[3] DVWA Vulnerability Lab',
      '    SQLi, XSS, CSRF practice with Burp Suite',
      '',
      '[4] Network Recon Script',
      '    Python automation with Nmap + HTML reporting',
      '',
      '[5] Homelab SIEM with Splunk',
      '    pfSense + Snort integration, log monitoring',
      '',
      '[6] WiFi Pentesting Lab',
      '    PMKID attacks with Kali + Wifite',
    ],
  },

  contact: {
    name: 'contact',
    description: 'Show contact info',
    execute: () => [
      'CONTACT INFORMATION',
      '═══════════════════',
      '',
      '┌─ Social Links ───────────────────┐',
      '│                                  │',
      '│  📧  normaniasich@gmail.com      │',
      '│  🐙  github.com/normania         │',
      '│  💼  linkedin.com/in/norman-iasich │',
      '│  🎯  tryhackme.com/p/baton.      │',
      '│                                  │',
      '└──────────────────────────────────┘',
      '',
      'Feel free to reach out for:',
      '  • CTF collaboration',
      '  • Security discussions',
      '  • Job opportunities',
    ],
  },

  goto: {
    name: 'goto',
    description: 'Navigate to section',
    execute: (args: string[]) => {
      const section = args[0]?.toLowerCase()
      const validSections = ['home', 'about', 'skills', 'cyberlab', 'certifications', 'contact']

      if (!section) {
        return ['Usage: goto [section]', `Available: ${validSections.join(', ')}`]
      }

      if (validSections.includes(section)) {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          return [`Navigating to ${section}...`]
        }
      }

      return [`goto: ${section}: No such section`]
    },
  },

  matrix: {
    name: 'matrix',
    description: 'Toggle matrix mode',
    execute: () => {
      const event = new CustomEvent('toggle-matrix')
      window.dispatchEvent(event)
      return ['Toggling matrix mode...']
    },
  },
}

export function processCommand(input: string): { command: string; output: string | string[] } {
  const parts = input.trim().split(' ')
  const command = parts[0].toLowerCase()
  const args = parts.slice(1)

  if (!command) {
    return { command: '', output: '' }
  }

  const cmd = commands[command]
  if (cmd) {
    return { command, output: cmd.execute(args) }
  }

  return {
    command,
    output: `Command not found: ${command}. Type "help" for available commands.`,
  }
}
