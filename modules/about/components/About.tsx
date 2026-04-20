import Breakline from '@/components/elements/Breakline'

import { ICareer } from '@/common/types/careers'
import { ICertificate } from '@/common/types/certificates'
import { IEducation } from '@/common/types/education'

import CertificateList from './CertificateList'
import CareerList from './CareerList'
import EducationList from './EducationList'
import SkillList from './SkillList'
import Summary from './Summary'

interface AboutProps {
  careers: ICareer[]
  certificates: ICertificate[]
  educations: IEducation[]
}

export default function About({ careers, certificates, educations }: AboutProps) {
  return (
    <section className="flex flex-col">
      <Summary />
      <Breakline />
      <CareerList careers={careers} />
      <Breakline />
      <EducationList educations={educations} />
      <Breakline />
      <SkillList />
      <Breakline />
      <CertificateList certificates={certificates} />
    </section>
  )
}
