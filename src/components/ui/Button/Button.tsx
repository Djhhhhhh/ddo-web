import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'tonal' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(' ')
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return <button className={cx(styles.btn, styles[variant], styles[size], className)} {...rest} />
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonLinkProps) {
  return <a className={cx(styles.btn, styles[variant], styles[size], className)} {...rest} />
}
