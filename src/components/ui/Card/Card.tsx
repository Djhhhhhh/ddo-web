import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 无阴影的平面卡片（嵌套 / 同级并列时用） */
  flat?: boolean
  /** 悬浮时轻微反馈 */
  interactive?: boolean
}

/**
 * 卡片 / 面板 —— DESIGN.md §4.6：
 * surface-1 底 + border + r-lg 12px + e2 轻阴影，内边距 14–18px。
 */
export function Card({ flat = false, interactive = false, className, ...rest }: CardProps) {
  return (
    <div
      className={[styles.card, flat && styles.flat, interactive && styles.interactive, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
}
