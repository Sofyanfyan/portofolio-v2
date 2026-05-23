import Link from 'next/link'

import SectionHeading from '@/components/elements/SectionHeading'
import SectionSubHeading from '@/components/elements/SectionSubHeading'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { SiHackerrank } from 'react-icons/si'

import { HACKERRANK_URL } from '@/common/constant'
import { HackerRankBadge, HackerRankBadgesResponse } from '@/common/types/hackerrank'

import OverviewItem from '../Contributions/OverviewItem'

function getBadgeUrl(url: string) {
  return url.startsWith('http') ? url : `https://www.hackerrank.com${url}`
}

function getProgressPercent(progress: number) {
  return Math.min(Math.max(progress * 100, 0), 100)
}

function getBestRank(badges: HackerRankBadge[]) {
  const ranks = badges.map(badge => badge.hacker_rank).filter(rank => rank > 0)

  return ranks.length ? Math.min(...ranks) : 0
}

function BadgeStars({ stars, totalStars }: { stars: number; totalStars: number }) {
  const starSlots = Array.from({ length: Math.max(stars, totalStars) }, (_, index) => index < stars)

  return (
    <span
      className="flex shrink-0 items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300"
      aria-label={`${stars} of ${totalStars} stars`}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {starSlots.map((isFilled, index) =>
          isFilled ? (
            <BsStarFill key={index} className="h-3 w-3 text-yellow-500" />
          ) : (
            <BsStar key={index} className="h-3 w-3 text-neutral-400 dark:text-neutral-500" />
          )
        )}
      </span>
    </span>
  )
}

export default function HackerRank({ hackerRankData }: { hackerRankData: HackerRankBadgesResponse }) {
  const badges = hackerRankData?.status ? hackerRankData.models ?? [] : []

  if (!badges.length) {
    return null
  }

  const totalStars = badges.reduce((total, badge) => total + badge.stars, 0)
  const totalSolved = badges.reduce((total, badge) => total + badge.solved, 0)
  const bestRank = getBestRank(badges)

  return (
    <section>
      <SectionHeading
        title="HackerRank Statistic"
        icon={
          <div className="h-5 w-5 overflow-hidden rounded">
            <SiHackerrank className="mr-1" />
          </div>
        }
      />
      <SectionSubHeading>
        <p className="dark:text-neutral-400">My HackerRank badge progress.</p>
        <Link
          href={HACKERRANK_URL}
          target="_blank"
          passHref
          className="font-code text-sm text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-400"
        >
          HackerRank
        </Link>
      </SectionSubHeading>

      <div className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-4">
        <OverviewItem label="Badges" value={badges.length} />
        <OverviewItem label="Stars" value={totalStars} unit="stars" />
        <OverviewItem label="Solved" value={totalSolved} />
        <OverviewItem label="Best Rank" value={bestRank} />
      </div>

      <div className="grid gap-3 py-2 md:grid-cols-2">
        {badges.map(badge => {
          const progressPercent = getProgressPercent(badge.progress_to_next_star)

          return (
            <Link
              key={badge.badge_type}
              href={getBadgeUrl(badge.url)}
              target="_blank"
              className="rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-green-500 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-medium">{badge.badge_name}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {badge.solved} / {badge.total_challenges} challenges solved
                  </p>
                </div>
                <BadgeStars stars={badge.stars} totalStars={badge.total_stars} />
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                <div className="h-full rounded-full bg-green-500" style={{ width: `${progressPercent}%` }} />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <span>{Math.floor(badge.current_points)} points</span>
                <span>Rank {badge.hacker_rank}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
