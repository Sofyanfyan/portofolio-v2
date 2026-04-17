'use client'

import Link from 'next/link'

import Breakline from '@/components/elements/Breakline'
import SectionHeading from '@/components/elements/SectionHeading'
import SectionSubHeading from '@/components/elements/SectionSubHeading'
import { useState } from 'react'
import { MdSpeed } from 'react-icons/md'

import { PAGESPEED_URL } from '@/common/constant'

import BadgeSection from './BadgeSection'
import SpeedSection from './SpeedSection'

export default function PageSpeed({ data }: { data: Record<string, unknown> }) {
  const [active, setActive] = useState('/')
  const pageSpeed = (data?.[active] || data?.['/']) as Record<string, unknown> | undefined

  function refetch(path: string) {
    setActive(path)
  }

  if (!pageSpeed) return null

  return (
    <section>
      <SectionHeading title="Pagespeed Insight" icon={<MdSpeed className="mr-1" />} />
      <SectionSubHeading>
        <p className="dark:text-neutral-400">My pagespeed index by google APIs</p>
        <Link
          href={PAGESPEED_URL}
          target="_blank"
          passHref
          className="font-code text-sm text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-400"
        >
          PageSpeed
        </Link>
      </SectionSubHeading>
      <BadgeSection active={active} refetch={refetch} />
      <SpeedSection data={pageSpeed} isLoading={false} />

      <Breakline />
    </section>
  )
}
