import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import Tooltip from '../Tooltip'

describe('Tooltip Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('Should render Tooltip component', () => {
    render(
      <Tooltip title="Test title">
        <h1>Children</h1>
      </Tooltip>
    )

    expect(screen.getByTestId('tooltip-container')).toBeTruthy()
  })

  it('Should render children component', () => {
    render(
      <Tooltip title="Test title">
        <h1>Children</h1>
      </Tooltip>
    )

    const parent = screen.getByTestId('tooltip-container')
    expect(within(parent).getByTestId('children-container')).not.toBeNull()
  })

  it('Should show and hide title on hover', () => {
    render(
      <Tooltip title="Test title">
        <h1>Children</h1>
      </Tooltip>
    )
    const childrenContainer = screen.getByTestId('children-container')

    expect(screen.queryByTestId('title')).toBeNull()

    fireEvent.mouseEnter(childrenContainer)

    expect(screen.getByTestId('title')).toBeTruthy()
    expect(screen.getByText('Test title')).toBeTruthy()

    fireEvent.mouseLeave(childrenContainer)

    expect(screen.queryByTestId('title')).toBeNull()
  })
})
