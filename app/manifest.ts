import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Achmad Sofyan - Software Engineer',
    short_name: 'Achmad Sofyan',
    description: 'Personal website, portfolio, blog, and programming tips of Achmad Sofyan',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/img/logo-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/img/logo-384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/img/logo-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
