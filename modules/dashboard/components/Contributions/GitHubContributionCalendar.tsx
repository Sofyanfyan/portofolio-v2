'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'

type GitHubContributionCalendarProps = {
  username: string
}

const CONTRIBUTION_WEEK_COUNT = 53
const BLOCK_MARGIN = 3
const WEEKDAY_LABEL_SPACE = 34
const MIN_BLOCK_SIZE = 10
const MAX_BLOCK_SIZE = 20
const FALLBACK_BLOCK_SIZE = 12

function getResponsiveBlockSize(containerWidth: number) {
  if (!containerWidth) {
    return FALLBACK_BLOCK_SIZE
  }

  const availableCalendarWidth = Math.max(containerWidth - WEEKDAY_LABEL_SPACE, 0)
  const fittedBlockSize = Math.floor(
    (availableCalendarWidth + BLOCK_MARGIN) / CONTRIBUTION_WEEK_COUNT - BLOCK_MARGIN
  )

  return Math.min(MAX_BLOCK_SIZE, Math.max(MIN_BLOCK_SIZE, fittedBlockSize))
}

export default function GitHubContributionCalendar({ username }: GitHubContributionCalendarProps) {
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light'
  const blockSize = getResponsiveBlockSize(containerWidth)

  useEffect(() => {
    const element = containerRef.current

    if (!element) {
      return
    }

    const updateContainerWidth = (width: number) => {
      setContainerWidth(currentWidth => {
        const nextWidth = Math.floor(width)

        return currentWidth === nextWidth ? currentWidth : nextWidth
      })
    }

    updateContainerWidth(element.clientWidth)

    if (typeof ResizeObserver === 'undefined') {
      const handleWindowResize = () => updateContainerWidth(element.clientWidth)

      window.addEventListener('resize', handleWindowResize)

      return () => window.removeEventListener('resize', handleWindowResize)
    }

    const resizeObserver = new ResizeObserver(entries => {
      updateContainerWidth(entries[0]?.contentRect.width ?? element.clientWidth)
    })

    resizeObserver.observe(element)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="no-scrollbar w-full min-w-0 overflow-x-auto py-2">
      <GitHubCalendar
        username={username}
        blockMargin={BLOCK_MARGIN}
        blockRadius={2}
        blockSize={blockSize}
        colorScheme={colorScheme}
        errorMessage="Unable to load GitHub contributions."
        fontSize={12}
        labels={{
          legend: {
            less: 'Less',
            more: 'More'
          },
          totalCount: '{{count}} contributions in the last year'
        }}
        showWeekdayLabels={['mon', 'wed', 'fri']}
        theme={{
          light: ['#e5e5e5', '#bbf7d0', '#86efac', '#22c55e', '#15803d'],
          dark: ['#262626', '#064e3b', '#047857', '#10b981', '#5eead4']
        }}
        className="!w-full text-neutral-600 dark:text-neutral-400"
      />
    </div>
  )
}
