import axios from 'axios'

import { HACKERRANK_USERNAME } from '@/common/constant'
import { HackerRankBadgesResponse } from '@/common/types/hackerrank'

const FALLBACK_HACKERRANK_BADGES: HackerRankBadgesResponse = {
  status: true,
  models: [
    {
      badge_category: 'HackerBadge::MultiDomain',
      badge_type: 'problem-solving',
      category_name: null,
      badge_name: 'Problem Solving',
      badge_short_name: null,
      total_stars: 6,
      total_points: 850,
      url: '/domains/algorithms',
      solved: 35,
      total_challenges: 563,
      track_total_score: 0,
      hacker_rank: 517981,
      stars: 4,
      level: 2,
      current_points: 479.16,
      progress_to_next_star: 0.01,
      upcoming_level: 'gold'
    },
    {
      badge_category: 'HackerBadge::Domain',
      badge_type: 'sql',
      category_name: 'Specialized Skills',
      badge_name: 'Sql',
      badge_short_name: null,
      total_stars: 5,
      total_points: 450,
      url: '/domains/sql',
      stars: 3,
      level: 2,
      current_points: 355,
      progress_to_next_star: 0.37,
      upcoming_level: null,
      solved: 27,
      total_challenges: 58,
      hacker_rank: 769033
    }
  ],
  version: 2
}

export async function getHackerRankServices() {
  try {
    const response = await axios.get<HackerRankBadgesResponse>(
      `https://www.hackerrank.com/rest/hackers/${HACKERRANK_USERNAME}/badges`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'codesofyan-dashboard'
        }
      }
    )

    return response.data.status ? response.data : FALLBACK_HACKERRANK_BADGES
  } catch {
    return FALLBACK_HACKERRANK_BADGES
  }
}
