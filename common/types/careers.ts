export interface ICareer {
  id?: string
  position: string
  company: string
  logo: string
  location: string
  location_type: string
  tasks?: string[]
  type: string
  start_date: string | Date
  end_date: string | Date | null
  link: string | null
  slug: string
}

export type ICareerCMS = {
  id?: string
  position: string
  company: string
  logo: string
  location: string
  locationType: string
  tasks?: string[]
  type: string
  startDate: string
  endDate: string | null
  link: string
  slug: string
}
