import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SOCIAL_MEDIA } from '@/common/constant/menu'

const { sendDataLayerMock } = vi.hoisted(() => ({
  sendDataLayerMock: vi.fn()
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/social-page'
}))

vi.mock('@/common/libs/gtm', () => ({
  sendDataLayer: sendDataLayerMock
}))

vi.mock('@next/third-parties/google', () => ({
  sendGTMEvent: sendDataLayerMock
}))

describe('SocialMedia Component', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    sendDataLayerMock.mockClear()
  })

  it('Should render SocialMedia component', async () => {
    const { default: SocialMedia } = await import('../SocialMedia')

    render(<SocialMedia items={SOCIAL_MEDIA} />)
    const container = screen.getByTestId('social-media')
    const text = screen.getByText('Let`s Connect')
    const itemsContainer = screen.getByTestId('social-media-items-container')
    const items = screen.getAllByTestId('social-media-item')
    const icons = screen.getAllByTestId('social-media-icon')

    expect(container).toBeTruthy()
    expect(container.className).toBe('flex flex-col space-y-1')
    expect(text).toBeTruthy()
    expect(text.className).toBe('mb-2 ml-2 mt-1 font-sora text-sm text-neutral-600 dark:text-neutral-500')
    expect(itemsContainer).toBeTruthy()
    expect(itemsContainer.className).toBe('flex justify-around space-x-2 px-5 pt-2 lg:justify-between')
    expect(items).toBeTruthy()
    expect(items.length).toBe(SOCIAL_MEDIA.length)
    expect(icons.length).toBe(SOCIAL_MEDIA.length)
    expect(icons[0].className).toBe(
      'text-neutral-700 transition duration-300 hover:text-neutral-900 dark:text-neutral-400 hover:dark:text-neutral-300 lg:hover:scale-110'
    )
  })

  it('Should render SocialMedia component on Me Page', async () => {
    const { default: SocialMedia } = await import('../SocialMedia')

    render(<SocialMedia items={SOCIAL_MEDIA} isMePage />)
    const container = screen.getByTestId('social-media')
    const itemsContainer = screen.getByTestId('social-media-items-container')

    expect(container).toBeTruthy()
    expect(container.className).toBe('flex flex-col space-y-1 mt-6 items-center')
    expect(itemsContainer).toBeTruthy()
    expect(itemsContainer.className).toBe('flex justify-around px-5 pt-2 lg:justify-between space-x-8')
  })

  it('Should send event and open social media link when clicked', async () => {
    const { default: SocialMedia } = await import('../SocialMedia')

    vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<SocialMedia items={SOCIAL_MEDIA} />)

    fireEvent.click(screen.getAllByTestId('social-media-item')[0])

    expect(sendDataLayerMock).toHaveBeenCalledWith({
      event: 'contact_clicked',
      contact_title: SOCIAL_MEDIA[0].title,
      page_path: '/social-page'
    })
    expect(window.open).toHaveBeenCalledWith(SOCIAL_MEDIA[0].href, '_blank')
  })
})
