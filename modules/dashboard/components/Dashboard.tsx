import Breakline from '@/components/elements/Breakline'

import { CodewarsData } from '@/common/types/codewars'

import Codewars from './Codewars'
import Contributions from './Contributions'
import PageSpeed from './PageSpeed'

interface DashboardProps {
  codewarsData: CodewarsData | null
  pageSpeedData: Record<string, unknown>
}
export default function Dashboard({ codewarsData, pageSpeedData }: DashboardProps) {
  return (
    <section className="flex flex-col">
      <PageSpeed data={pageSpeedData} />
      <Contributions />
      <Breakline />
      <Codewars codewarsData={codewarsData} />
    </section>
  )
}
