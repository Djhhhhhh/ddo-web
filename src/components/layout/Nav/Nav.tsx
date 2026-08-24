import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PRODUCTS } from '../../../lib/products'
import { useTheme } from '../../../theme/ThemeProvider'
import { Icon } from '../../ui/Icon'
import styles from './Nav.module.css'

export function Nav() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.wordmark}>ddo</span>
          <span className={styles.badge}>产品族</span>
        </Link>

        <nav
          className={[styles.links, open ? styles.open : ''].filter(Boolean).join(' ')}
          aria-label="产品导航"
        >
          {PRODUCTS.map((product) => (
            <NavLink
              key={product.id}
              to={product.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
              }
            >
              {product.name}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
            title="切换主题"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
          </button>
          <button
            className={styles.hamburger}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '关闭菜单' : '打开菜单'}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
