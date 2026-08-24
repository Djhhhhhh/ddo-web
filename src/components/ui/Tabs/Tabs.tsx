import styles from './Tabs.module.css'

export interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  tabs: TabItem[]
  activeId: string
  onChange: (id: string) => void
  'aria-label'?: string
}

/**
 * Tabs —— DESIGN.md §4.7：
 * surface-2 pill 容器 + border + r-md，激活态 surface-1 浮起小卡（不用下划线）。
 */
export function Tabs({ tabs, activeId, onChange, 'aria-label': ariaLabel }: TabsProps) {
  return (
    <div className={styles.container} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const active = tab.id === activeId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={styles.tab}
            data-active={active || undefined}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
