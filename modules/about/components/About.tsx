import Breakline from '@/components/elements/Breakline'

import { ICareer } from '@/common/types/careers'

import CareerList from './CareerList'
import SkillList from './SkillList'
import Summary from './Summary'

interface AboutProps {
  careers: ICareer[]
}

export default function About({ careers }: AboutProps) {
  return (
    <section className="flex flex-col">
      <Summary />
      <Breakline />
      <CareerList careers={careers} />
      <Breakline />
      <SkillList />
    </section>
  )
}
