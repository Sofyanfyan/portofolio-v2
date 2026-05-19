import { ICareer } from '../types/careers'

export const careersMock: ICareer[] = [
  {
    position: 'Senior Frontend Engineer',
    company: 'codesofyan',
    logo: '/images/codesofyan.png',
    location: 'Surabaya, Indonesia',
    location_type: 'remote',
    tasks: ['Build and maintain frontend features', 'Collaborate with product and design teams'],
    type: 'full-time',
    start_date: new Date(),
    end_date: null,
    link: 'https://www.codesofyan.com/',
    slug: 'codesofyan'
  }
]
