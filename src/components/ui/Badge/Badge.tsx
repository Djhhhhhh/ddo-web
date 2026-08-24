import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'accent' | 'neutral' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

/**
 * 标签 / 徽章 —— DESIGN.md §4.3：
 * role 标签等宽、accent 变体用 accent-subtle 底 + accent 文字；
 * 语义徽章用对应语义色 @14% 底 + 同色文字 + @28% 边框。
 */
export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
