import Breakline from '@/components/elements/Breakline'

import { ICareer } from '@/common/types/careers'
import { IEducation } from '@/common/types/education'

import CareerList from './CareerList'
import EducationList from './EducationList'
import SkillList from './SkillList'
import Summary from './Summary'

interface AboutProps {
  careers: ICareer[]
  educations: IEducation[]
}

export default function About({ careers, educations }: AboutProps) {
  return (
    <section className="flex flex-col">
      <Summary />
      <Breakline />
      <CareerList careers={careers} />
      <Breakline />
      <EducationList educations={educations} />
      <Breakline />
      <SkillList />
    </section>
  )
}
