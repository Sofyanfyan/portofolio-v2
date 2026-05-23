'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

import { cn } from '@/common/libs/cn'

interface ChatAvatarProps {
  name: string
  image?: string
  size?: number
  className?: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(item => item.charAt(0).toUpperCase())
    .join('')
}

export default function ChatAvatar({ name, image, size = 40, className }: ChatAvatarProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const shouldShowImage = Boolean(image && !hasImageError)
  const dimension = { width: size, height: size }

  if (shouldShowImage) {
    return (
      <img
        src={image}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        style={dimension}
        className={cn('shrink-0 rounded-full object-cover', className)}
        onError={() => setHasImageError(true)}
      />
    )
  }

  return (
    <div
      style={dimension}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200',
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
