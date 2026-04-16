import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type CyberlabItem = {
  slug: string
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

export type CyberlabItemFull = CyberlabItem & {
  content: string
}

const CATEGORY_MAP: Record<string, CyberlabItem['category']> = {
  projects: 'project',
  labs: 'lab',
  ctfs: 'ctf',
}

const BASE_DIR = path.join(process.cwd(), 'content', 'cyberlab')

export function getCyberlabItems(): CyberlabItem[] {
  const items: CyberlabItem[] = []

  for (const folder of Object.keys(CATEGORY_MAP)) {
    const folderPath = path.join(BASE_DIR, folder)
    if (!fs.existsSync(folderPath)) continue

    for (const file of fs.readdirSync(folderPath).filter((f) => f.endsWith('.md'))) {
      const raw = fs.readFileSync(path.join(folderPath, file), 'utf-8')
      const { data, content } = matter(raw)
      const slug = file.replace('.md', '')
      const lines = content.trim().split('\n')
      const short = lines[0] ?? ''

      items.push({
        slug,
        title: data.title ?? slug,
        short,
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

export function getCyberlabItemBySlug(slug: string): CyberlabItemFull | null {
  for (const folder of Object.keys(CATEGORY_MAP)) {
    const filePath = path.join(BASE_DIR, folder, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const lines = content.trim().split('\n')
    const short = lines[0] ?? ''

    return {
      slug,
      title: data.title ?? slug,
      short,
      content: content.trim(),
      tags: Array.isArray(data.tags) ? data.tags : [],
      badge: data.badge ?? '',
      accent: data.accent ?? 'blue',
      category: CATEGORY_MAP[folder],
      difficulty: data.difficulty,
      link: data.link,
      order: data.order,
    }
  }

  return null
}

export function getAllCyberlabSlugs(): string[] {
  const slugs: string[] = []

  for (const folder of Object.keys(CATEGORY_MAP)) {
    const folderPath = path.join(BASE_DIR, folder)
    if (!fs.existsSync(folderPath)) continue

    for (const file of fs.readdirSync(folderPath).filter((f) => f.endsWith('.md'))) {
      slugs.push(file.replace('.md', ''))
    }
  }

  return slugs
}
