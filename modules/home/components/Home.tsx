import Breakline from '@/components/elements/Breakline'

import { IServices } from '@/common/types/services'

import Introduction from './Introduction'
import ServicesList from './ServicesList'

interface HomeProps {
  services: IServices[]
}

export default function Home({ services }: HomeProps) {
  return (
    <>
      <Introduction />
      <Breakline className="my-20 3xl:my-10" />
      <ServicesList services={services} />
    </>
  )
}
