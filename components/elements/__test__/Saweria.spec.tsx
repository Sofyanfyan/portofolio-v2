import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SAWERIA_URL } from '@/common/constant'

const { sendDataLayerMock } = vi.hoisted(() => ({
  sendDataLayerMock: vi.fn()
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/saweria-page'
}))

vi.mock('@/common/libs/gtm', () => ({
  sendDataLayer: sendDataLayerMock
}))

vi.mock('@next/third-parties/google', () => ({
  sendGTMEvent: sendDataLayerMock
}))

describe('Saweria Component', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    sendDataLayerMock.mockClear()
  })

  it('Should render Saweria with text component', async () => {
    const { default: Saweria } = await import('../Saweria')

    render(<Saweria withText />)
    const container = screen.getByTestId('saweria-button-with-text')
    expect(container).toBeTruthy()
    expect(container.className).toBe(
      'flex h-max w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-white shadow-sm transition-all delay-75 duration-300 hover:gap-3 hover:transition-all hover:duration-300 md:w-max'
    )
  })

  it('Should render Buy me a Coffee text', async () => {
    const { default: Saweria } = await import('../Saweria')

    render(<Saweria withText />)

    const container = screen.getByText('Buy me a Coffee')
    expect(container).toBeTruthy()
  })

  it('Should render Saweria without text component', async () => {
    const { default: Saweria } = await import('../Saweria')

    render(<Saweria />)
    const container = screen.getByTestId('saweria-button-without-text')
    expect(container).toBeTruthy()
    expect(container.hasAttribute('aria-label')).toBe(true)
  })

  it('Should send event and open Saweria when clicked', async () => {
    const { default: Saweria } = await import('../Saweria')

    vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<Saweria withText />)

    fireEvent.click(screen.getByTestId('saweria-button-with-text'))

    expect(sendDataLayerMock).toHaveBeenCalledWith({
      event: 'saweria_clicked',
      page_path: '/saweria-page'
    })
    expect(window.open).toHaveBeenCalledWith(SAWERIA_URL, '_blank')
  })
})
