import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import BackButton from '../BackButton'

const { backMock } = vi.hoisted(() => ({
  backMock: vi.fn()
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: backMock
  })
}))

describe('Back Button Component', () => {
  afterEach(() => {
    backMock.mockClear()
  })

  it('Should render back button when not passing props', () => {
    render(<BackButton />)
    const button = screen.getByTestId('back-button')

    expect(button).toBeTruthy()
    expect(button.className).toBe(
      'flex gap-2 w-max hover:gap-3 items-center pb-5 transition-all duration-300 font-medium text-neutral-600 dark:text-neutral-400 cursor-pointer'
    )
  })

  it('Should render back button when passing props', () => {
    render(<BackButton url="/test" />)
    const button = screen.getByTestId('back-button-url')

    expect(button).toBeTruthy()
    expect(button.getAttribute('href')).toBe('/test')
  })

  it('Should render back icon when passing props', () => {
    render(<BackButton url="/test" />)
    const icon = screen.getAllByTestId('back-icon')[0]

    expect(icon).toBeTruthy()
  })

  it('Should render back icon when not passing props', () => {
    render(<BackButton />)
    const icon = screen.getAllByTestId('back-icon')[1]

    expect(icon).toBeTruthy()
  })

  it('Should call router back when clicking back button', () => {
    const { container } = render(<BackButton />)
    const button = container.querySelector('[data-testid="back-button"]') as HTMLElement

    fireEvent.click(button)

    expect(backMock).toHaveBeenCalledTimes(1)
  })
})
