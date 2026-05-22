import { Metadata } from 'next'

import Container from '@/components/elements/Container'
import PageHeading from '@/components/elements/PageHeading'
import { getPageSpeedData } from '@/services/dashboard'
import { getHackerRankServices } from '@/services/hackerrank'

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
  const [hackerRankData, pageSpeedData] = await Promise.all([getHackerRankServices(), getPageSpeedData()])
  return (
    <>
      <Container data-aos="fade-left">
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Dashboard hackerRankData={hackerRankData} pageSpeedData={pageSpeedData} />
      </Container>
    </>
  )
}
