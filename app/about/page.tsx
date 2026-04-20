import { Metadata } from 'next'

import Container from '@/components/elements/Container'
import PageHeading from '@/components/elements/PageHeading'
import StructuredData from '@/components/elements/StructuredData'
import { getCareers, getCertificates, getEducations } from '@/services/codebayu'
import { Person, WithContext } from 'schema-dts'

import { METADATA } from '@/common/constant/metadata'

import About from '@/modules/about'

export const metadata: Metadata = {
  title: `About ${METADATA.exTitle}`,
  description: `A short story of ${METADATA.creator}`,
  alternates: {
    canonical: `${process.env.DOMAIN}/about`
  }
}

function generateStructuredData(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: METADATA.authors.name,
    url: METADATA.authors.url,
    image: METADATA.profile,
    jobTitle: 'Software Engineer',
    gender: 'Male'
  }
}

const PAGE_TITLE = 'About'
const PAGE_DESCRIPTION = 'A short story of me'

export default async function AboutPage() {
  const [careers, educations, certificates] = await Promise.all([getCareers(), getEducations(), getCertificates()])
  return (
    <>
      <StructuredData data={generateStructuredData()} />
      <Container data-aos="fade-left">
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <About careers={careers} educations={educations} certificates={certificates} />
      </Container>
    </>
  )
}
