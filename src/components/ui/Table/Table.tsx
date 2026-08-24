import type { HTMLAttributes } from 'react'
import styles from './Table.module.css'

/**
 * 密集表格容器 —— DESIGN.md §4.8：
 * 表头 11px uppercase text-tertiary，单元格 9px padding，行 hover surface-2。
 * 用法：<Table><thead>…</thead><tbody>…</tbody></Table>
 */
export function Table({ className, ...rest }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className={styles.wrap}>
      <table className={[styles.table, className].filter(Boolean).join(' ')} {...rest} />
    </div>
  )
}
