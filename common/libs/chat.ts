export const CHAT_AUTHOR_EMAIL = 'fyans665@gmail.com'
export const CHAT_DELETE_WINDOW_MS = 5 * 60 * 1000

export function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() || ''
}

export function isChatAuthor(email?: string | null) {
  return normalizeEmail(email) === CHAT_AUTHOR_EMAIL
}

export function isWithinChatDeleteWindow(createdAt: string, now = Date.now()) {
  const createdAtTime = new Date(createdAt).getTime()

  if (Number.isNaN(createdAtTime)) return false

  return now - createdAtTime <= CHAT_DELETE_WINDOW_MS
}

export function isSameChatOwner({
  email,
  sessionEmail,
  sessionUid,
  uid
}: {
  email: string
  sessionEmail: string
  sessionUid?: string
  uid?: string
}) {
  const normalizedUid = uid?.trim() || ''
  const normalizedSessionUid = sessionUid?.trim() || ''

  if (normalizedUid && normalizedSessionUid) {
    return normalizedUid === normalizedSessionUid
  }

  return normalizeEmail(email) === normalizeEmail(sessionEmail)
}

export function canDeleteChatMessage({
  createdAt,
  email,
  now,
  sessionEmail,
  sessionUid,
  uid
}: {
  createdAt: string
  email: string
  now?: number
  sessionEmail: string
  sessionUid?: string
  uid?: string
}) {
  return isSameChatOwner({ email, sessionEmail, sessionUid, uid }) && isWithinChatDeleteWindow(createdAt, now)
}
