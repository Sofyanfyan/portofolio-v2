import { getBlogDetail, getLearnArticleDetail } from './blog'

export async function getBlogViews(slug: string, learnSlug?: string) {
  if (learnSlug) {
    const article = await getLearnArticleDetail(slug, learnSlug)
    return article.page_views_count || 0
  }

  const article = await getBlogDetail(slug)
  return article.page_views_count || 0
}
