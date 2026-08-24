import { useEffect, useState } from 'react'
import styles from './DotNav.module.css'

export interface DotNavSection {
  id: string
  label: string
}

interface DotNavProps {
  sections: DotNavSection[]
}

/**
 * 点式导航（scrollspy）—— 借鉴 bebold 的 dots-navigation：
 * 固定右侧竖排圆点，滚动时高亮当前章节，激活态用 accent，悬停显示中文标签。
 */
export function DotNav({ sections }: DotNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const ids = sections.map((s) => s.id)

    const update = () => {
      const mid = window.innerHeight * 0.4
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) current = id
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sections])

  return (
    <nav className={styles.nav} aria-label="页面章节">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={styles.item}
          data-active={active === s.id || undefined}
        >
          <span className={styles.dot} />
          <span className={styles.label}>{s.label}</span>
        </a>
      ))}
    </nav>
  )
}
