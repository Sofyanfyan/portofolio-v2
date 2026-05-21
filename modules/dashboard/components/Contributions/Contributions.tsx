import Link from 'next/link'

import SectionHeading from '@/components/elements/SectionHeading'
import SectionSubHeading from '@/components/elements/SectionSubHeading'
import { BsGithub as GithubIcon } from 'react-icons/bs'

import { GITHUB_ACCOUNTS } from '@/common/constant/github'

import GitHubContributionCalendar from './GitHubContributionCalendar'

export default function Contributions() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-y-2">
      <SectionHeading title="Contributions" icon={<GithubIcon className="mr-1" />} />
      <SectionSubHeading>
        <p className="dark:text-neutral-400">My public contributions from last year on GitHub.</p>
        <Link
          href={`https://github.com/${GITHUB_ACCOUNTS.username}`}
          target="_blank"
          passHref
          className="font-code text-sm text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-400"
        >
          @{GITHUB_ACCOUNTS.username}
        </Link>
      </SectionSubHeading>

      <div className="w-full min-w-0 space-y-3">
        <GitHubContributionCalendar username={GITHUB_ACCOUNTS.username} />
      </div>
    </section>
  )
}
