import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.wordmark}>ddo</span>
        </div>
        <p className={styles.text}>ddo 产品族 · 开发者与 AI 工程场景</p>
        <p className={styles.meta}>
          界面遵循 <span className={styles.mono}>DESIGN.md</span> —— 暗色优先 · 中性蓝灰 ·
          单一绿色信号
        </p>
      </div>
    </footer>
  )
}
