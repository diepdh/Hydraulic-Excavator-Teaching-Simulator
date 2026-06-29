import { render, screen } from '@testing-library/react'
import App from '@/App'
import { describe, it, expect } from 'vitest'

describe('App Smoke Test', () => {
  it('renders project title', () => {
    render(<App />)
    expect(screen.getByText('Hydraulic Excavator Teaching Simulator')).toBeInTheDocument()
  })

  it('renders simulation scene components', () => {
    render(<App />)
    expect(screen.getByText('Không gian mô phỏng 2D Excavator')).toBeInTheDocument()
    expect(screen.getByText('Bảng điều khiển')).toBeInTheDocument()
    expect(screen.getByText('Thông số Telemetry')).toBeInTheDocument()
  })
})
