import Breakline from '@/components/elements/Breakline'

import { HackerRankBadgesResponse } from '@/common/types/hackerrank'

import Contributions from './Contributions'
import HackerRank from './HackerRank'
import PageSpeed from './PageSpeed'

interface DashboardProps {
  hackerRankData: HackerRankBadgesResponse
  pageSpeedData: Record<string, unknown>
}
export default function Dashboard({ hackerRankData, pageSpeedData }: DashboardProps) {
  return (
    <section className="flex flex-col">
      <PageSpeed data={pageSpeedData} />
      <Contributions />
      <Breakline />
      <HackerRank hackerRankData={hackerRankData} />
    </section>
  )
}
