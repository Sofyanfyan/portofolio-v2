'use client'

import { useRouter } from 'next/navigation'

import { Card } from '@/components/elements/Card'
import Image from '@/components/elements/Image'
import { differenceInMonths, differenceInYears, format } from 'date-fns'
import { useTheme } from 'next-themes'
import { BsBuildings as CompanyIcon } from 'react-icons/bs'

import { getCloudinaryUrl } from '@/common/libs/cloudinary'
import { cn } from '@/common/libs/cn'
import { sendDataLayer } from '@/common/libs/gtm'
import { ICareer } from '@/common/types/careers'

import useHasMounted from '@/hooks/useHasMounted'

export default function CareerCard({
  position,
  company,
  logo,
  location,
  location_type,
  start_date,
  end_date,
  slug
}: ICareer) {
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  const startDate = new Date(start_date)
  const endDate = end_date ? new Date(end_date) : new Date()

  const durationYears = differenceInYears(endDate, startDate)
  const durationMonths = differenceInMonths(endDate, startDate) % 12

  let durationText = ''
  if (durationYears > 0) {
    durationText += `${durationYears} Year${durationYears > 1 ? 's' : ''} `
  }
  if (durationMonths > 0 || durationYears === 0) {
    durationText += `${durationMonths} Month${durationMonths > 1 ? 's' : ''}`
  }

  const workLocationType = location_type
    ? `${location_type.charAt(0).toUpperCase()}${location_type.slice(1).toLowerCase()}`
    : null

  function handleCardClick() {
    sendDataLayer({
      event: 'career_clicked',
      career_position: position,
      career_company: company,
      career_duration: durationText
    })
    router.push(`/experience/${slug}`)
  }

  const mounted = useHasMounted()
  if (!mounted) return null

  return (
    <Card
      onClick={handleCardClick}
      className="flex h-max min-w-[350px] cursor-pointer items-center gap-5 overflow-hidden rounded-l-sm rounded-r-xl border border-l-0 border-neutral-300 py-2 !shadow-none duration-500 hover:scale-95 dark:border-neutral-600 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950"
    >
      <div className="relative my-2 h-max">
        <div
          className={cn(
            'flex items-center rounded-r-full border border-l-0 border-neutral-300 shadow-lg dark:border-neutral-600 dark:shadow-neutral-800',
            resolvedTheme === 'light' ? 'inverted-image-left' : 'inverted-image-left-dark'
          )}
        >
          {logo ? (
            <Image src={getCloudinaryUrl(logo)} width={55} height={55} alt={company} className="relative z-10" />
          ) : (
            <CompanyIcon size={30} />
          )}
        </div>
      </div>

      <div className="flex flex-col items-start space-y-1">
        <h2>{position}</h2>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-1 md:gap-2">
            <span>{company}</span>
            <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
            <span>{location}</span>
            {workLocationType && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
                <span className="rounded-full border border-neutral-300 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
                  {workLocationType}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col items-start md:text-[13px]">
            <div className="flex gap-1">
              <span>{format(startDate, 'MMM yyyy')}</span> - <span>{end_date ? format(endDate, 'MMM yyyy') : 'Present'}</span>
            </div>
            <span className="text-neutral-500 dark:text-neutral-500">~ {durationText}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
