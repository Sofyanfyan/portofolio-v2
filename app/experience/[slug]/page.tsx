import { Metadata } from 'next'

import BackButton from '@/components/elements/BackButton'
import Container from '@/components/elements/Container'
import { getCareers } from '@/services/codebayu'

import { METADATA } from '@/common/constant/metadata'
import { ICareer } from '@/common/types/careers'

import ExperienceDetail from '@/modules/experience'

export const metadata: Metadata = {
  title: `Experience ${METADATA.exTitle}`,
  description: 'My proffesional carrer journey in detail as software development',
  keywords: 'blog Achmad Sofyan, codebayu',
  alternates: {
    canonical: `${process.env.DOMAIN}/experience`
  }
}

export default async function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const careers = await getCareers()
  const career: ICareer = careers.find(item => item.slug === params.slug) as ICareer
  return (
    <>
      <Container data-aos="fade-left">
        <BackButton />
        <ExperienceDetail {...career} />
      </Container>
    </>
  )
}
