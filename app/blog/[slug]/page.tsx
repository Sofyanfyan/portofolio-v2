import { Metadata } from 'next'

import BackButton from '@/components/elements/BackButton'
import Container from '@/components/elements/Container'
import ReaderPage from '@/components/elements/ReaderPage'
import StructuredData from '@/components/elements/StructuredData'
import { getBlogDetail, getComments } from '@/services/blog'
import { BlogPosting, WithContext } from 'schema-dts'

import { METADATA } from '@/common/constant/metadata'
import { BlogDetailProps, CommentItemProps } from '@/common/types/blog'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogDetail(params.slug)
  return {
    title: `${blog.title} ${METADATA.exTitle}`,
    description: blog.description,
    openGraph: {
      images: blog.cover_image,
      url: `${process.env.DOMAIN}/${blog.slug}`,
      siteName: METADATA.openGraph.siteName,
      locale: METADATA.openGraph.locale,
      type: 'article',
      authors: METADATA.creator
    },
    keywords: blog.title,
    alternates: {
      canonical: `${process.env.DOMAIN}/${blog.slug}`
    }
  }
}

function generateStructuredData(blog: BlogDetailProps, comments: CommentItemProps[]): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    name: blog.title,
    description: blog.description,
    datePublished: blog.published_at,
    dateCreated: blog.created_at,
    url: blog.url,
    author: {
      '@type': 'Person',
      name: METADATA.creator,
      url: process.env.DOMAIN
    },
    image: {
      '@type': 'ImageObject',
      url: blog.cover_image
    },
    commentCount: comments.length,
    keywords: blog.tag_list
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlogDetail(params.slug)
  const comments = await getComments()

  return (
    <>
      <StructuredData data={generateStructuredData(blog, comments)} />
      <Container data-aos="fade-left">
        <BackButton url="/blog?category=home" />
        <ReaderPage content={blog} pageViewCount={blog.page_views_count} comments={comments} />
      </Container>
    </>
  )
}
