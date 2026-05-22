import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { useHasMountedMock, useThemeMock } = vi.hoisted(() => ({
  useHasMountedMock: vi.fn(),
  useThemeMock: vi.fn()
}))

vi.mock('next-themes', () => ({
  useTheme: useThemeMock
}))

vi.mock('@/hooks/useHasMounted', () => ({
  default: useHasMountedMock
}))

vi.mock('../../../hooks/useHasMounted', () => ({
  default: useHasMountedMock
}))

describe('Status Component', () => {
  async function renderStatus() {
    const { default: Status } = await import('../Status')
    render(<Status />)
  }

  beforeEach(() => {
    useHasMountedMock.mockReturnValue(true)
    useThemeMock.mockReturnValue({ resolvedTheme: 'dark' })
  })

  afterEach(() => {
    cleanup()
    useHasMountedMock.mockReset()
    useThemeMock.mockReset()
  })

  it('Should render status container element', async () => {
    await renderStatus()

    const element = screen.getByTestId('available-hire-container')
    expect(element).toBeTruthy()
    expect(element.className).toBe(
      'absolute inverted-border-radius-dark left-0 z-10 rounded-br-xl bg-white py-2 pr-2 dark:bg-dark'
    )
  })

  it('Should render status container element light', async () => {
    useThemeMock.mockReturnValue({ resolvedTheme: 'light' })

    await renderStatus()

    const element = screen.getByTestId('available-hire-container')
    expect(element).toBeTruthy()
    expect(element.className).toBe(
      'absolute inverted-border-radius left-0 z-10 rounded-br-xl bg-white py-2 pr-2 dark:bg-dark'
    )
  })

  it('Should render available element', async () => {
    await renderStatus()

    const element = screen.getByTestId('available-hire')
    expect(element).toBeTruthy()
    expect(element.className).toBe(
      'relative flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-2 py-1 dark:border-neutral-700 dark:bg-dark'
    )
  })

  it('Should render available element', async () => {
    await renderStatus()

    const dots = screen.getByTestId('dots')
    expect(dots).toBeTruthy()
    expect(dots.className).toBe('h-2 w-2 rounded-full bg-green-400')
  })

  it('Should render Hire Me text', async () => {
    await renderStatus()

    const hire = screen.getByText('Hire me.')
    expect(hire).toBeTruthy()
    expect(hire.className).toBe('text-xs text-neutral-600 dark:text-neutral-400')
  })

  it('Should not render status when not mounted', async () => {
    useHasMountedMock.mockReturnValue(false)

    await renderStatus()

    expect(screen.queryByTestId('available-hire-container')).toBeNull()
    expect(screen.queryByTestId('available-hire')).toBeNull()
    expect(screen.queryByTestId('dots')).toBeNull()
    expect(screen.queryByText('Hire me.')).toBeNull()
  })
})
