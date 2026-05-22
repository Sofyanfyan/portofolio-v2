import Link from 'next/link'

import React from 'react'

import { IBadgeVariant } from '@/common/types'

interface BadgeProps {
  children: React.ReactNode
  href?: string
  target?: React.HTMLAttributeAnchorTarget | undefined
  variant?: IBadgeVariant
  size?: 'small' | 'medium' | 'large'
}

type BadgeSize = NonNullable<BadgeProps['size']>

const BADGE_VARIANT_COLORS: Record<IBadgeVariant, string> = {
  primary: 'bg-neutral-200 dark:bg-neutral-700',
  secondary: 'bg-neutral-700 text-white dark:bg-neutral-200 dark:text-black',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-200 dark:text-black',
  danger: 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-black',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-black',
  info: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-200 dark:text-black'
}

const BADGE_SIZES: Record<BadgeSize, string> = {
  small: 'px-2 py-[1px] text-[10px]',
  medium: 'px-2 py-1 text-xs',
  large: 'px-3 py-2 text-xs'
}

export default function Badge(props: BadgeProps) {
  const { children, variant = 'primary', size = 'medium', href, target } = props
  const variantColor = BADGE_VARIANT_COLORS[variant]
  const chooseSize = BADGE_SIZES[size]

  if (href)
    return (
      <Link
        data-testid="badge-link"
        href={href}
        target={target}
        className={`rounded-full text-center font-medium ${chooseSize} ${variantColor}`}
      >
        {children}
      </Link>
    )
  return (
    <span data-testid="badge" className={`rounded-full text-center font-medium ${chooseSize} ${variantColor}`}>
      {children}
    </span>
  )
}
