'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { PLACEHOLDER_URL } from '@/common/constant'

type ImageProps = {
  fallbackSrc?: NextImageProps['src']
  rounded?: string
} & NextImageProps

const Image = (props: ImageProps) => {
  const { alt, src, className, fallbackSrc = PLACEHOLDER_URL, onError, onLoad, rounded, priority, ...rest } = props
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setImageSrc(src || fallbackSrc)
    setLoading(true)
  }, [fallbackSrc, src])

  return (
    <div className={clsx('overflow-hidden', isLoading ? 'animate-pulse' : '', rounded)}>
      <NextImage
        data-testid="image"
        className={clsx(
          'duration-700 ease-in-out',
          isLoading ? 'scale-[1.02] blur-xl grayscale' : 'scale-100 blur-0 grayscale-0',
          rounded,
          className
        )}
        src={imageSrc}
        alt={alt}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={100}
        onError={event => {
          onError?.(event)
          setLoading(false)
          if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc)
        }}
        onLoad={event => {
          onLoad?.(event)
          setLoading(false)
        }}
        {...rest}
      />
    </div>
  )
}
export default Image
