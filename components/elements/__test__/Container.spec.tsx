import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Container from '../Container'

const { useSearchParamsMock } = vi.hoisted(() => ({
  useSearchParamsMock: vi.fn()
}))

vi.mock('next/navigation', () => ({
  useSearchParams: useSearchParamsMock
}))

describe('Container Component', () => {
  beforeEach(() => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams())
  })

  afterEach(() => {
    cleanup()
    useSearchParamsMock.mockReset()
  })

  it('Should render container element', () => {
    render(
      <Container className="text-neutral-800">
        <h1>Children</h1>
      </Container>
    )

    const element = screen.getByTestId('container')
    expect(element).toBeTruthy()
    expect(element.className).toBe('mb-10 p-4 md:p-8 lg:pr-0 mt-6 text-neutral-800')
  })

  it('Should hide top margin in read mode when margin top is disabled', () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams({ 'read-mode': 'true' }))

    render(
      <Container withMarginTop={false}>
        <h1>Children</h1>
      </Container>
    )

    const element = screen.getByTestId('container')
    expect(element.className).toBe('mb-10 p-4 md:p-8 lg:pr-0')
  })

  it('Should keep top margin in read mode by default', () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams({ 'read-mode': 'true' }))

    render(
      <Container>
        <h1>Children</h1>
      </Container>
    )

    const element = screen.getByTestId('container')
    expect(element.className).toBe('mb-10 p-4 md:p-8 lg:pr-0 mt-6')
  })
})
