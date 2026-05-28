import Breakline from '@/components/elements/Breakline'

import { IAdsBanner } from '@/common/types/ads'
import { BlogItem } from '@/common/types/blog'
import { ILearn } from '@/common/types/learn'
import { IServices } from '@/common/types/services'

import Introduction from './Introduction'
import ServicesList from './ServicesList'

interface HomeProps {
  articles: BlogItem[]
  learns: ILearn[]
  promotion?: IAdsBanner
  services: IServices[]
}

export default function Home({ services }: HomeProps) {
  return (
    <>
      <Introduction />
      <Breakline className="my-20 3xl:my-10" />
      <ServicesList services={services} />
      <Breakline className="my-20 3xl:my-10" />
    </>
  )
}
