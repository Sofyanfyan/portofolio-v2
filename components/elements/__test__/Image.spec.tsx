/* eslint-disable @next/next/no-img-element */
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ImgHTMLAttributes } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Image from '../Image'

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    void priority
    return <img {...props} alt={props.alt} />
  }
}))

describe('Image Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('Should render image component', () => {
    const { container } = render(<Image src="/test" alt="test" width={100} height={100} rounded="rounded" />)
    const image = screen.getByTestId('image')

    expect(image).toBeTruthy()
    expect(image.getAttribute('loading')).toBe('lazy')
    expect(image.className).toContain('scale-[1.02] blur-xl grayscale')
    expect(container.firstElementChild?.className).toContain('animate-pulse')
  })

  it('Should handle image load state and callback', async () => {
    const onLoad = vi.fn()

    const { container } = render(
      <Image src="/test" alt="test" width={100} height={100} rounded="rounded" priority onLoad={onLoad} />
    )
    const image = screen.getByTestId('image')

    expect(image.getAttribute('loading')).toBe('eager')

    fireEvent.load(image)

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(image.className).toContain('scale-100 blur-0 grayscale-0')
      expect(container.firstElementChild?.className).not.toContain('animate-pulse')
    })
  })

  it('Should switch to fallback image on error', async () => {
    const onError = vi.fn()

    render(
      <Image
        src="/broken-image.png"
        fallbackSrc="/fallback-image.png"
        alt="test"
        width={100}
        height={100}
        onError={onError}
      />
    )
    const image = screen.getByTestId('image')

    fireEvent.error(image)

    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1)
      expect(image.getAttribute('src')).toBe('/fallback-image.png')
      expect(image.className).toContain('scale-100 blur-0 grayscale-0')
    })

    fireEvent.error(image)

    expect(onError).toHaveBeenCalledTimes(2)
  })

  it('Should handle fallback source and events without callbacks', async () => {
    render(<Image src="" fallbackSrc="/fallback-image.png" alt="test" width={100} height={100} />)
    const image = screen.getByTestId('image')

    expect(image.getAttribute('src')).toBe('/fallback-image.png')

    fireEvent.load(image)
    fireEvent.error(image)

    await waitFor(() => {
      expect(image.getAttribute('src')).toBe('/fallback-image.png')
      expect(image.className).toContain('scale-100 blur-0 grayscale-0')
    })
  })
})
