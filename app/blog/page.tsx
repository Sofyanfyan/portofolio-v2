import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Container from '@/components/elements/Container'
import { getBlogData } from '@/services/blog'

import { METADATA } from '@/common/constant/metadata'

import Blog from '@/modules/blog'

export const metadata: Metadata = {
  title: `Blog ${METADATA.exTitle}`,
  description: 'My blogs content about programming and software development',
  keywords: 'blog Achmad Sofyan, codebayu',
  alternates: {
    canonical: `${process.env.DOMAIN}/blog`
  }
}

export default async function BlogPage({ searchParams }: { searchParams: { category: string } }) {
  if (!searchParams.category) {
    redirect('/blog?category=home')
  }
  const blogs = await getBlog(searchParams.category)
  return (
    <Container data-aos="fade-left">
      <Blog blogs={blogs} />
    </Container>
  )
}

async function getBlog(category: string) {
  return getBlogData(category)
}
