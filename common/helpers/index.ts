import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const formatBlogSlug = (slug: string) => slug?.replace(/-[a-f0-9]{4}$/i, '')

export const formatDate = (date: string, type = 'MMMM dd, yyyy') => {
  const formattedDate = format(utcToZonedTime(parseISO(date), 'Asia/Jakarta'), type)
  return formattedDate
}
