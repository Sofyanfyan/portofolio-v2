import { ICareer } from './careers'
import { ILearn } from './learn'
import { IProjectItem } from './projects'
import { IServices } from './services'

export type IBadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

export interface ICodeBayuData {
  careers: ICareer[]
  projects: IProjectItem[]
  learns: ILearn[]
  services: IServices[]
}
