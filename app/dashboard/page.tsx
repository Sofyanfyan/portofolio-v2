import { Metadata } from 'next'

import Container from '@/components/elements/Container'
import PageHeading from '@/components/elements/PageHeading'
import { getCodewarsServices } from '@/services/codewars'
import { getPageSpeedData } from '@/services/dashboard'

import { METADATA } from '@/common/constant/metadata'

import Dashboard from '@/modules/dashboard'

export const metadata: Metadata = {
  title: `Dashboard ${METADATA.exTitle}`,
  description: 'My activity dashboard as software engineer',
  alternates: {
    canonical: `${process.env.DOMAIN}/dashboard`
  }
}

const PAGE_TITLE = 'Dashboard'
const PAGE_DESCRIPTION =
  'This is my personal dashboard, built with Next.js API routes deployed as serverless functions.'

export default async function DahboardPage() {
  const [codewarsData, pageSpeedData] = await Promise.all([getCodewarsServices(), getPageSpeedData()])
  return (
    <>
      <Container data-aos="fade-left">
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Dashboard codewarsData={codewarsData} pageSpeedData={pageSpeedData} />
      </Container>
    </>
  )
}
