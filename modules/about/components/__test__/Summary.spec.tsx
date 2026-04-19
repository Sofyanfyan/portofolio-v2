import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { summaryMock } from '@/common/mocks/summary'

import Summary from '../Summary'

describe('Summary Component', () => {
  beforeEach(() => {
    render(<Summary />)
  })

  it('Should render summary component', () => {
    expect(screen.getByTestId('summary')).toBeTruthy()
  })

  it('Should render all summary paragraphs', () => {
    summaryMock.paragraphs.forEach(paragraph => {
      expect(screen.getAllByText(paragraph)[0]).toBeTruthy()
    })
  })
})
