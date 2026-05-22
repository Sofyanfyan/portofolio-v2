import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IAdsBanner } from '@/common/types/ads'

import MultiplePromotion from '../MultiplePromotion'
import SinglePromotion from '../SinglePromotion'

const promotion: IAdsBanner = {
  id: 'promotion-1',
  text: 'Promotion',
  image: '/promotion.png',
  link: 'https://example.com',
  isShow: true,
  showingOn: ['/'],
  createdAt: '2026-05-22',
  updatedAt: null
}

describe('Promotion Components', () => {
  it('Should not render single promotion ads', () => {
    const { container } = render(<SinglePromotion data={promotion} />)

    expect(container.firstChild).toBeNull()
  })

  it('Should not render multiple promotion ads', () => {
    const { container } = render(<MultiplePromotion data={[promotion]} />)

    expect(container.firstChild).toBeNull()
  })
})
