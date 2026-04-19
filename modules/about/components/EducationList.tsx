import SectionHeading from '@/components/elements/SectionHeading'
import SectionSubHeading from '@/components/elements/SectionSubHeading'
import { HiOutlineAcademicCap } from 'react-icons/hi'

import { IEducation } from '@/common/types/education'

import EducationCard from './EducationCard'

export default function EducationList({ educations }: { educations: IEducation[] }) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title="Education" icon={<HiOutlineAcademicCap className="mr-1" />} />
        <SectionSubHeading>
          <p className="dark:text-neutral-400">Academic background and learning milestones</p>
        </SectionSubHeading>
      </div>

      {educations.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {educations.map((education, index) => (
            <EducationCard key={education.id ?? `${education.name}-${education.title}-${index}`} {...education} />
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-neutral-300 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 p-6 dark:border-neutral-700 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="relative space-y-2">
            <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">Education section is ready</p>
            <p className="max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              Add documents to the <code>educations</code> Firestore collection using the fields <code>name</code>, <code>logo</code>, <code>score</code>, <code>start_date</code>, <code>end_date</code>, and <code>title</code>, and they will automatically appear here in a polished card layout.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
