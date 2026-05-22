import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import AnimateCounter from '../AnimateCounter'

type CounterAnimationOptions = {
  duration: number
  onUpdate: (value: number) => void
}

const { animateMock, stopMock } = vi.hoisted(() => {
  const stopMock = vi.fn()
  const animateMock = vi.fn((from: number, to: number, options: CounterAnimationOptions) => {
    options.onUpdate(to + 0.75)
    return { stop: stopMock }
  })

  return { animateMock, stopMock }
})

vi.mock('framer-motion', () => ({
  animate: animateMock
}))

describe('Animate Counter Component', () => {
  afterEach(() => {
    animateMock.mockClear()
    stopMock.mockClear()
  })

  it('Should render animated counter', () => {
    const { unmount } = render(<AnimateCounter total={42} className="counter" />)
    const counter = screen.getByTestId('counter')

    expect(counter).toBeTruthy()
    expect(counter.className).toBe('counter')
    expect(counter.textContent).toBe('42')
    expect(animateMock).toHaveBeenCalledWith(
      0,
      42,
      expect.objectContaining({
        duration: 1,
        onUpdate: expect.any(Function)
      })
    )

    unmount()
    expect(stopMock).toHaveBeenCalledTimes(1)
  })
})
