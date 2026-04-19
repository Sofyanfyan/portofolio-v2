import React from 'react'

import { summaryMock } from '@/common/mocks/summary'

export default function Summary() {
  const paragraphs = summaryMock.paragraphs ?? []

  return (
    <div data-testid="summary" className="flex flex-col space-y-6 font-sans text-neutral-800 dark:text-neutral-300">
      {paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}
