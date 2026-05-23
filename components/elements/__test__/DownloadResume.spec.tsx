import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { RESUME_URL } from '@/common/constant'

const { sendDataLayerMock } = vi.hoisted(() => ({
  sendDataLayerMock: vi.fn()
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/resume-page'
}))

vi.mock('@/common/libs/gtm', () => ({
  sendDataLayer: sendDataLayerMock
}))

vi.mock('@next/third-parties/google', () => ({
  sendGTMEvent: sendDataLayerMock
}))

describe('DownloadResume Component', () => {
  beforeEach(async () => {
    const { default: DownloadResume } = await import('../DownloadResume')

    vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<DownloadResume />)
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    sendDataLayerMock.mockClear()
  })

  it('Should render download resume component', () => {
    const button = screen.getByRole('button')
    expect(button).toBeTruthy()
    expect(button.className).toBe(
      'flex items-center gap-2 text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-300'
    )
  })

  it('Should render download icon', () => {
    expect(screen.getAllByTestId('download-icon')[0]).toBeTruthy()
  })

  it('Should render download icon container', () => {
    const container = screen.getAllByTestId('download-icon-container')[0]
    expect(container).toBeTruthy()
    expect(container.className).toBe('overflow-hidden border-b-2 border-neutral-600 dark:border-neutral-500')
  })

  it('Should send event and open resume when clicked', () => {
    fireEvent.click(screen.getByRole('button'))

    expect(sendDataLayerMock).toHaveBeenCalledWith({
      event: 'resume_clicked',
      page_path: '/resume-page'
    })
    expect(window.open).toHaveBeenCalledWith(RESUME_URL, '_blank')
  })
})
