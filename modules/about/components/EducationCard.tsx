import { format } from 'date-fns'
import { HiOutlineAcademicCap, HiOutlineCalendar } from 'react-icons/hi'

import { Card } from '@/components/elements/Card'
import Image from '@/components/elements/Image'

import { getCloudinaryUrl } from '@/common/libs/cloudinary'
import { IEducation } from '@/common/types/education'

export default function EducationCard({ name, logo, score, start_date, end_date, title }: IEducation) {
  const startDate = new Date(start_date)
  const endDate = end_date ? new Date(end_date) : null

  return (
    <Card className="flex items-start gap-5 overflow-hidden rounded-l-sm rounded-r-xl border border-l-0 border-neutral-300 bg-white py-4 !shadow-none transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-950">
      <div className="relative my-1 h-max">
        <div className="flex items-center rounded-r-full border border-l-0 border-neutral-300 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-950">
          <div className="flex h-[55px] w-[55px] items-center justify-center">
            {logo ? (
              <Image src={getCloudinaryUrl(logo)} width={55} height={55} alt={name} className="relative z-10 object-contain" />
            ) : (
              <HiOutlineAcademicCap className="text-[28px] text-neutral-500 dark:text-neutral-300" />
            )}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 pr-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <HiOutlineAcademicCap className="text-sm" />
              Education
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{name}</p>
          </div>
          <div className="shrink-0 rounded-full border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 dark:border-neutral-700 dark:text-neutral-200">
            {score}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <HiOutlineCalendar className="text-base" />
          <span>
            {format(startDate, 'MMM yyyy')} - {endDate ? format(endDate, 'MMM yyyy') : 'Present'}
          </span>
        </div>
      </div>
    </Card>
  )
}
