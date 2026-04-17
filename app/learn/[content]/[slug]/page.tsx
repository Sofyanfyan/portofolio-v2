import { Metadata } from 'next'

import BackButton from '@/components/elements/BackButton'
import Container from '@/components/elements/Container'
import ReaderPage from '@/components/elements/ReaderPage'
import { getComments, getLearnArticleDetail } from '@/services/blog'
import { getBlogViews } from '@/services/view'

import { METADATA } from '@/common/constant/metadata'

interface Params {
  content: string
  slug: string
}

interface LearnContentDetailPageProps {
  params: Params
}

export async function generateMetadata({ params }: LearnContentDetailPageProps): Promise<Metadata> {
  const data = await getLearnArticleDetail(params.slug, params.content)
  return {
    title: `${data.title} ${METADATA.exTitle}`,
    description: data.description,
    openGraph: {
      url: METADATA.openGraph.url,
      siteName: METADATA.openGraph.siteName,
      locale: METADATA.openGraph.locale,
      type: 'article',
      authors: METADATA.creator,
      images: data.social_image
    },
    keywords: data.tag_list,
    alternates: {
      canonical: `${process.env.DOMAIN}/learn/${params.content}/${params.slug}`
    }
  }
}

export default async function LearnContentDetailPage({ params }: LearnContentDetailPageProps) {
  const content = await getLearnArticleDetail(params.slug, params.content)
  const pageViewCount = await getBlogViews(params.slug, params.content)
  const comments = await getComments()
  return (
    <>
      <Container data-aos="fade-left">
        <BackButton />
        <ReaderPage comments={comments} content={content} pageViewCount={pageViewCount} />
      </Container>
    </>
  )
}
