import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import Embed from '../Embed'

describe('Embed Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('Should render embed component', () => {
    render(<Embed />)

    expect(screen.getByTestId('tiktok-embed')).toBeTruthy()
  })

  it('Should render username anchor', () => {
    render(<Embed />)

    expect(screen.getAllByText('@codesofyan.com')[0]).toBeTruthy()
  })

  it('Should add and remove TikTok embed script', () => {
    const { unmount } = render(<Embed />)
    const script = document.querySelector('script[src="https://www.tiktok.com/embed.js"]')

    expect(script).toBeTruthy()
    expect((script as HTMLScriptElement).async).toBe(true)

    unmount()

    expect(document.querySelector('script[src="https://www.tiktok.com/embed.js"]')).toBeNull()
  })
})
