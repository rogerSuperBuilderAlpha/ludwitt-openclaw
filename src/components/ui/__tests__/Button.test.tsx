import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Click' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    const btn = screen.getByRole('button', { name: 'Primary' })
    expect(btn).toHaveClass('bg-gray-900')

    rerender(<Button variant="danger">Danger</Button>)
    const dangerBtn = screen.getByRole('button', { name: 'Danger' })
    expect(dangerBtn).toHaveClass('bg-red-600')

    rerender(<Button variant="outline">Outline</Button>)
    const outlineBtn = screen.getByRole('button', { name: 'Outline' })
    expect(outlineBtn).toHaveClass('border-2')

    rerender(<Button variant="secondary">Secondary</Button>)
    const secondaryBtn = screen.getByRole('button', { name: 'Secondary' })
    expect(secondaryBtn).toHaveClass('bg-gray-600')
  })

  it('applies disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>)
    const btn = screen.getByRole('button', { name: 'Disabled' })
    expect(btn).toBeDisabled()
  })

  it('renders with className prop', () => {
    render(<Button className="my-custom-class">Styled</Button>)
    const btn = screen.getByRole('button', { name: 'Styled' })
    expect(btn).toHaveClass('my-custom-class')
  })

  it('forwards aria props', () => {
    render(
      <Button aria-label="Save document" aria-describedby="help-text">
        Save
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'Save document' })
    expect(btn).toHaveAttribute('aria-describedby', 'help-text')
  })

  it('shows loading state when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('applies size styles', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6')
  })
})
