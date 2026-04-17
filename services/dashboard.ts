import { getDocumentData } from './firestore'

export async function getPageSpeedData() {
  const dashboard = await getDocumentData<{ pagespeed?: Record<string, unknown> }>('dashboard', 'stats')
  return dashboard?.pagespeed || {}
}
