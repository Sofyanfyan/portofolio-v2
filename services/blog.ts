import { BlogDetailProps, BlogItem, CommentItemProps } from '@/common/types/blog'

import { getCollectionDocuments } from './firestore'

function sortByPublishedAt<T extends { published_at: string }>(articles: T[]) {
  return [...articles].sort((firstItem, secondItem) => {
    return new Date(secondItem.published_at).getTime() - new Date(firstItem.published_at).getTime()
  })
}

async function getPublishedArticles() {
  const articles = await getCollectionDocuments<BlogDetailProps>('articles')
  return sortByPublishedAt(articles).filter(item => item.published !== false)
}

export async function getBlogData(category = 'home'): Promise<BlogItem[]> {
  const articles = await getPublishedArticles()
  const blogs = articles.filter(item => item.type === 'blog')

  if (category === 'home') {
    return blogs
  }

  return blogs.filter(item => item.category === category)
}

export async function getLatestArticles(limit = 4): Promise<BlogItem[]> {
  const articles = await getPublishedArticles()
  return articles.slice(0, limit)
}

export async function getLearnArticles(learnSlug: string): Promise<BlogItem[]> {
  const articles = await getPublishedArticles()
  return articles.filter(item => item.type === 'learn' && item.learn_slug === learnSlug)
}

export async function getBlogDetail(slug: string): Promise<BlogDetailProps> {
  const articles = await getPublishedArticles()
  const article = articles.find(item => item.type === 'blog' && item.slug === slug)

  return (
    article || {
      id: '',
      title: '',
      description: '',
      type: 'blog',
      category: 'home',
      published: false,
      slug: '',
      comments_count: 0,
      page_views_count: 0,
      cover_image: '',
      created_at: '',
      edited_at: null,
      published_at: '',
      reading_time_minutes: 0,
      tag_list: [],
      tags: [],
      body_html: '',
      body_markdown: ''
    }
  )
}

export async function getLearnArticleDetail(slug: string, learnSlug: string): Promise<BlogDetailProps> {
  const articles = await getPublishedArticles()
  const article = articles.find(item => item.type === 'learn' && item.slug === slug && item.learn_slug === learnSlug)

  return (
    article || {
      id: '',
      title: '',
      description: '',
      type: 'learn',
      category: learnSlug,
      learn_slug: learnSlug,
      published: false,
      slug: '',
      comments_count: 0,
      page_views_count: 0,
      cover_image: '',
      created_at: '',
      edited_at: null,
      published_at: '',
      reading_time_minutes: 0,
      tag_list: [],
      tags: [],
      body_html: '',
      body_markdown: ''
    }
  )
}

export async function getComments(): Promise<CommentItemProps[]> {
  return []
}
