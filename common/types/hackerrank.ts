export interface HackerRankBadge {
  badge_category: string
  badge_type: string
  category_name: string | null
  badge_name: string
  badge_short_name: string | null
  total_stars: number
  total_points: number
  url: string
  solved: number
  total_challenges: number
  track_total_score?: number
  hacker_rank: number
  stars: number
  level: number
  current_points: number
  progress_to_next_star: number
  upcoming_level: string | null
}

export interface HackerRankBadgesResponse {
  status: boolean
  models: HackerRankBadge[]
  version: number
}
