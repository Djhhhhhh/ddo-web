import { useRef, useState, type ReactNode } from 'react'
import { Icon } from '../Icon'
import styles from './CodeBlock.module.css'

interface CodeBlockProps {
  /** 头部右侧标签，如 "run · standard" */
  label?: string
  /** 显式指定要复制的文本；缺省读取代码内容 innerText */
  copyText?: string
  children: ReactNode
}

/**
 * 代码块 —— DESIGN.md §4.6 / §2.8：
 * r-lg 圆角、code-bg 恒暗（亮色模式也不变浅）、1px border、Fira Code、右上 copy。
 */
export function CodeBlock({ label = 'code', copyText, children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    const text = copyText ?? preRef.current?.innerText ?? ''
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        fallbackCopy(text)
      }
    } catch {
      fallbackCopy(text)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.lang}>{label}</span>
        <button className={styles.copy} type="button" onClick={onCopy}>
          <Icon name={copied ? 'check' : 'copy'} size={13} />
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre ref={preRef} className={styles.body}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

function fallbackCopy(text: string) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } catch {
    /* ignore */
  }
  document.body.removeChild(ta)
}
