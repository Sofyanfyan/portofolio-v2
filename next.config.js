/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to'
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to'
      },
      {
        protocol: 'https',
        hostname: 'mci-onemore.my'
      },
      {
        protocol: 'https',
        hostname: 'cdn.techinasia.com'
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com'
      },
      {
        protocol: 'https',
        hostname: 'images.glints.com'
      },
      {
        protocol: 'https',
        hostname: 'katamata.wordpress.com'
      },
      {
        protocol: 'https',
        hostname: 'prima-ptki.kemenag.go.id'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
    ]
  },
  env: {
    GTM_ID: process.env.GTM_ID,
    GOOGLE_ADSENSE_UNIT_BLOG_CLIENT: process.env.GOOGLE_ADSENSE_UNIT_BLOG_CLIENT,
    GOOGLE_ADSENSE_UNIT_BLOG_SLOT: process.env.GOOGLE_ADSENSE_UNIT_BLOG_SLOT
  }
}

module.exports = nextConfig
