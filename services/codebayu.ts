import { ICodeBayuData } from '@/common/types'
import { IAdsBanner } from '@/common/types/ads'
import { ICareer } from '@/common/types/careers'
import { ILearn } from '@/common/types/learn'
import { IProjectItem } from '@/common/types/projects'
import { IServices } from '@/common/types/services'

import { getCollectionDocuments } from './firestore'

function sortByDate<T>(items: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc') {
  return [...items].sort((firstItem, secondItem) => {
    const firstValue = new Date(String(firstItem[key])).getTime()
    const secondValue = new Date(String(secondItem[key])).getTime()

    return direction === 'asc' ? firstValue - secondValue : secondValue - firstValue
  })
}

export async function getCodeBayuData(): Promise<ICodeBayuData> {
  const [careers, projects, learns, services] = await Promise.all([
    getCareers(),
    getProjects(),
    getLearns(),
    getServices()
  ])

  return {
    careers,
    projects,
    learns,
    services
  }
}

export async function getPromotions(): Promise<IAdsBanner[]> {
  const promotions = await getCollectionDocuments<IAdsBanner>('banner')
  return promotions.filter(item => item.isShow)
}

export async function getLearns(): Promise<ILearn[]> {
  const learns = await getCollectionDocuments<ILearn>('learns')
  return [...learns].sort((firstItem, secondItem) => firstItem.title.localeCompare(secondItem.title))
}

export async function getServices(): Promise<IServices[]> {
  const services = await getCollectionDocuments<IServices>('services')
  return sortByDate(services, 'createdAt')
}

export async function getCareers(): Promise<ICareer[]> {
  const careers = await getCollectionDocuments<ICareer>('careers')
  return sortByDate(careers, 'start_date', 'desc')
}

export async function getProjects(): Promise<IProjectItem[]> {
  const projects = await getCollectionDocuments<IProjectItem>('projects')
  return [...projects].sort((firstItem, secondItem) => {
    if (firstItem.is_featured === secondItem.is_featured) return 0
    return firstItem.is_featured ? -1 : 1
  })
}
