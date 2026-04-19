import Image from 'next/image'

import MDXComponent from '@/components/elements/MDXComponent'
import { format } from 'date-fns'

import { getCloudinaryUrl } from '@/common/libs/cloudinary'
import loadMdxFiles from '@/common/libs/mdx'
import { ICareer } from '@/common/types/careers'

export default function ExperienceDetail(props: ICareer) {
  const { logo, company, position, location, location_type, tasks, start_date, end_date, slug } = props

  const startDate = new Date(start_date)
  const endDate = end_date ? new Date(end_date) : new Date()

  const contents = loadMdxFiles(slug, 'experience')
  const content = contents.find(item => item.slug === slug)?.content

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-x-4 border-b border-dashed border-neutral-600 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">{company}</h2>
          <div className="mt-1 flex gap-1 text-sm">
            <span>{format(startDate, 'MMM yyyy')}</span> -{' '}
            <span>{end_date ? format(endDate, 'MMM yyyy') : 'Present'}</span>
          </div>
        </div>
        <Image src={getCloudinaryUrl(logo)} alt={company} width={60} height={60} />
      </div>
      <p className="font-sans text-neutral-700 dark:text-neutral-300">
        At {company}, I proudly served as <strong>{position}</strong> based in {location}, contributing my expertise
        from {format(startDate, 'MMM yyyy')} to {end_date ? format(endDate, 'MMM yyyy') : 'Present'} in a dynamic{' '}
        {location_type} setting.
      </p>
      {tasks && tasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Key Tasks</h3>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700 marker:text-neutral-500 dark:text-neutral-300 dark:marker:text-neutral-400">
            {tasks.map(task => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      )}
      {content && <MDXComponent>{content}</MDXComponent>}
    </div>
  )
}
