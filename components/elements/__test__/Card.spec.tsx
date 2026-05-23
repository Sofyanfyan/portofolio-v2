import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card, GlossyCard } from '../Card'

describe('Card Component', () => {
  it('Should render card component', () => {
    render(
      <Card>
        <h1>Children</h1>
      </Card>
    )
    expect(screen.getByTestId('card')).toBeTruthy()
  })

  it('Should render glossy card component', () => {
    const { container } = render(
      <GlossyCard>
        <h1>Children</h1>
      </GlossyCard>
    )

    expect(container.firstChild).toBeTruthy()
  })
})
