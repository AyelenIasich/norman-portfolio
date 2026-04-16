import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type CyberlabItem = {
  title: string
  short: string
  tags: string[]
  badge: string
  accent: 'blue' | 'gold' | 'green' | 'red'
  category: 'project' | 'lab' | 'ctf'
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  link?: string
  order?: number
}

const CATEGORY_MAP: Record<string, CyberlabItem['category']> = {
  projects: 'project',
  labs: 'lab',
  ctfs: 'ctf',
}

export function getCyberlabItems(): CyberlabItem[] {
  const baseDir = path.join(process.cwd(), 'content', 'cyberlab')
  const items: CyberlabItem[] = []

  for (const folder of Object.keys(CATEGORY_MAP)) {
    const folderPath = path.join(baseDir, folder)

    if (!fs.existsSync(folderPath)) continue

    const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.md'))

    for (const file of files) {
      const raw = fs.readFileSync(path.join(folderPath, file), 'utf-8')
      const { data, content } = matter(raw)

      items.push({
        title: data.title ?? file.replace('.md', ''),
        short: content.trim(),
        tags: Array.isArray(data.tags) ? data.tags : [],
        badge: data.badge ?? '',
        accent: data.accent ?? 'blue',
        category: CATEGORY_MAP[folder],
        difficulty: data.difficulty,
        link: data.link,
        order: data.order,
      })
    }
  }

  return items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}
