const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/codesofyan/image/upload/f_auto,q_auto/v1/codesofyan'

const LOCAL_ASSETS: Record<string, string> = {
  '/backdrop': '/backdrop_services.jpg',
  '/placeholder': '/img/logo-black.png'
}

function isRemoteUrl(path: string) {
  return /^https?:\/\//.test(path)
}

function isLinkedInMediaUrl(path: string) {
  try {
    return new URL(path).hostname === 'media.licdn.com'
  } catch {
    return false
  }
}

function isKnownPublicAsset(path: string) {
  return path.startsWith('/img/') || path === '/backdrop_services.jpg' || path === '/next.svg' || path === '/vercel.svg'
}

export function getCloudinaryUrl(path?: string | null) {
  const normalizedPath = path?.trim() || ''

  if (!normalizedPath) return ''
  if (LOCAL_ASSETS[normalizedPath]) return LOCAL_ASSETS[normalizedPath]
  if (isLinkedInMediaUrl(normalizedPath)) return ''
  if (isRemoteUrl(normalizedPath) || isKnownPublicAsset(normalizedPath)) return normalizedPath

  return `${CLOUDINARY_BASE_URL}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`
}
