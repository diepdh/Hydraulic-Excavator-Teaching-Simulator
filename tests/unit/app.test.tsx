import { render, screen } from '@testing-library/react'
import App from '@/App'
import { describe, it, expect } from 'vitest'

describe('App Smoke Test', () => {
  it('renders project title', () => {
    render(<App />)
    expect(screen.getByText('Hydraulic Excavator Teaching Simulator')).toBeInTheDocument()
  })

  it('renders simulation scene placeholder', () => {
    render(<App />)
    expect(screen.getByText('[Simulation Scene Placeholder - SVG Canvas]')).toBeInTheDocument()
  })
})
