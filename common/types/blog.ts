export type UserProps = {
  name: string
  username: string
  twitter_username: string | null
  github_username: string
  user_id: number
  website_url: string
  profile_image: string
  profile_image_90: string
}

export type BlogItem = {
  id: string
  title: string
  description: string
  type: 'blog' | 'learn'
  category: string
  learn_slug?: string
  published: boolean
  published_at: string
  slug: string
  path?: string
  url?: string
  comments_count: number
  page_views_count: number
  body_markdown?: string
  cover_image: string
  tag_list: string[]
  reading_time_minutes: number
  canonical_url?: string
  external_url?: string
  created_at: string
  updated_at?: string | null
}

export type BlogDetailProps = {
  id: string
  title: string
  description: string
  type: 'blog' | 'learn'
  category: string
  learn_slug?: string
  published: boolean
  slug: string
  path?: string
  url?: string
  comments_count: number
  page_views_count: number
  cover_image: string
  social_image?: string
  canonical_url?: string
  external_url?: string
  created_at: string
  edited_at: string | null
  published_at: string
  reading_time_minutes: number
  tag_list: string[]
  tags: string[]
  body_html: string
  body_markdown: string
}

export type BlogProps = {
  blogs: BlogItem[]
}

export type CommentItemProps = {
  type_of: string
  id_code: string
  created_at: string
  body_html: string
  user: UserProps
  children: CommentItemProps[]
}
