import { ICareer } from '../types/careers'

export const careersMock: ICareer[] = [
  {
    position: 'Senior Frontend Engineer',
    company: 'CodeBayu',
    logo: '/images/codebayu.png',
    location: 'Surabaya, Indonesia',
    location_type: 'remote',
    tasks: ['Build and maintain frontend features', 'Collaborate with product and design teams'],
    type: 'full-time',
    start_date: new Date(),
    end_date: null,
    link: 'https://www.codebayu.com/',
    slug: 'codebayu'
  }
]
