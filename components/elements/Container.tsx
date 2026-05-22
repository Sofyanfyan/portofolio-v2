'use client'

import { useSearchParams } from 'next/navigation'

import { ReactNode } from 'react'

import { cn } from '@/common/libs/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  [propName: string]: ReactNode | string | undefined
  withMarginTop?: boolean
}

export default function Container({ children, className = '', withMarginTop = true, ...others }: ContainerProps) {
  const searchParams = useSearchParams()
  const readMode = searchParams.get('read-mode')
  const hasMarginTop = readMode !== 'true' || withMarginTop
  return (
    <div
      data-testid="container"
      className={cn('mb-10 p-4 md:p-8 lg:pr-0', hasMarginTop && 'mt-6', className)}
      {...others}
    >
      {children}
    </div>
  )
}
