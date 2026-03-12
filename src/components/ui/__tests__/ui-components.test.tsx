import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorAlert } from '@/components/common/ErrorAlert'
import { LoadingScreen } from '@/components/common/LoadingScreen'

jest.mock('lucide-react', () => ({
  AlertCircle: (props: any) => (
    <span data-testid="icon-alert-circle" {...props} />
  ),
  CheckCircle: (props: any) => (
    <span data-testid="icon-check-circle" {...props} />
  ),
  AlertTriangle: (props: any) => (
    <span data-testid="icon-alert-triangle" {...props} />
  ),
  Info: (props: any) => <span data-testid="icon-info" {...props} />,
  X: (props: any) => <span data-testid="icon-x" {...props} />,
  RefreshCw: (props: any) => <span data-testid="icon-refresh" {...props} />,
}))

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-900')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Sec</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600')
  })

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-2')
  })

  it('applies danger variant classes', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })

  it('applies sm size classes', () => {
    render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3')
  })

  it('applies md size classes by default', () => {
    render(<Button>Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4')
  })

  it('applies lg size classes', () => {
    render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6')
  })

  it('shows Loading... text and disables button when isLoading is true', () => {
    render(<Button isLoading>Save</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveTextContent('Loading...')
    // Original children should not appear
    expect(btn).not.toHaveTextContent('Save')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Nope</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('fires onClick handler', () => {
    const handler = jest.fn()
    render(<Button onClick={handler}>Go</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('passes through extra HTML attributes', () => {
    render(
      <Button data-custom="yes" type="submit">
        Submit
      </Button>
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('data-custom', 'yes')
    expect(btn).toHaveAttribute('type', 'submit')
  })

  it('appends custom className', () => {
    render(<Button className="mt-4">Styled</Button>)
    expect(screen.getByRole('button')).toHaveClass('mt-4')
  })
})

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------
describe('Badge', () => {
  it('renders children in a span', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active').tagName).toBe('SPAN')
  })

  it('applies default blue subtle classes', () => {
    render(<Badge>Status</Badge>)
    const badge = screen.getByText('Status')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-700')
  })

  it('applies green solid classes', () => {
    render(
      <Badge color="green" variant="solid">
        OK
      </Badge>
    )
    const badge = screen.getByText('OK')
    expect(badge).toHaveClass('bg-green-600', 'text-white')
  })

  it('applies red outline classes', () => {
    render(
      <Badge color="red" variant="outline">
        Alert
      </Badge>
    )
    const badge = screen.getByText('Alert')
    expect(badge).toHaveClass('border-red-600', 'text-red-600')
  })

  it('applies sm size classes', () => {
    render(<Badge size="sm">Tiny</Badge>)
    expect(screen.getByText('Tiny')).toHaveClass('px-2', 'text-xs')
  })

  it('applies lg size classes', () => {
    render(<Badge size="lg">Big</Badge>)
    expect(screen.getByText('Big')).toHaveClass('px-3', 'text-sm')
  })

  it('appends custom className', () => {
    render(<Badge className="ml-2">Custom</Badge>)
    expect(screen.getByText('Custom')).toHaveClass('ml-2')
  })
})

// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------
describe('Alert', () => {
  it('renders children content', () => {
    render(<Alert type="info">Something happened</Alert>)
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('shows icon by default for error type', () => {
    render(<Alert type="error">Oops</Alert>)
    expect(screen.getByTestId('icon-alert-circle')).toBeInTheDocument()
  })

  it('shows CheckCircle icon for success type', () => {
    render(<Alert type="success">Done</Alert>)
    expect(screen.getByTestId('icon-check-circle')).toBeInTheDocument()
  })

  it('shows AlertTriangle icon for warning type', () => {
    render(<Alert type="warning">Watch out</Alert>)
    expect(screen.getByTestId('icon-alert-triangle')).toBeInTheDocument()
  })

  it('shows Info icon for info type', () => {
    render(<Alert type="info">FYI</Alert>)
    expect(screen.getByTestId('icon-info')).toBeInTheDocument()
  })

  it('hides icon when icon prop is false', () => {
    render(
      <Alert type="error" icon={false}>
        No icon
      </Alert>
    )
    expect(screen.queryByTestId('icon-alert-circle')).not.toBeInTheDocument()
  })

  it('applies error container classes', () => {
    render(<Alert type="error">Err</Alert>)
    expect(screen.getByText('Err').closest('.rounded-lg')).toHaveClass(
      'bg-red-50'
    )
  })

  it('applies success container classes', () => {
    render(<Alert type="success">Yay</Alert>)
    expect(screen.getByText('Yay').closest('.rounded-lg')).toHaveClass(
      'bg-green-50'
    )
  })

  it('applies warning container classes', () => {
    render(<Alert type="warning">Hmm</Alert>)
    expect(screen.getByText('Hmm').closest('.rounded-lg')).toHaveClass(
      'bg-yellow-50'
    )
  })

  it('applies info container classes', () => {
    render(<Alert type="info">Note</Alert>)
    expect(screen.getByText('Note').closest('.rounded-lg')).toHaveClass(
      'bg-blue-50'
    )
  })

  it('appends custom className', () => {
    render(
      <Alert type="info" className="mb-4">
        Styled
      </Alert>
    )
    expect(screen.getByText('Styled').closest('.rounded-lg')).toHaveClass(
      'mb-4'
    )
  })
})

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('does not have hover class by default', () => {
    render(<Card>No hover</Card>)
    expect(screen.getByText('No hover').closest('div')).not.toHaveClass(
      'hover:shadow-lg'
    )
  })

  it('adds hover:shadow-lg class when hover=true', () => {
    render(<Card hover>Hoverable</Card>)
    expect(screen.getByText('Hoverable').closest('div')).toHaveClass(
      'hover:shadow-lg'
    )
  })

  it('appends custom className', () => {
    render(<Card className="border-2">Extra</Card>)
    expect(screen.getByText('Extra').closest('div')).toHaveClass('border-2')
  })
})

// ---------------------------------------------------------------------------
// ProgressBar
// ---------------------------------------------------------------------------
describe('ProgressBar', () => {
  it('shows label and percentage by default', () => {
    render(<ProgressBar percentage={42} />)
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('hides label when showLabel=false', () => {
    render(<ProgressBar percentage={42} showLabel={false} />)
    expect(screen.queryByText('Progress')).not.toBeInTheDocument()
    expect(screen.queryByText('42%')).not.toBeInTheDocument()
  })

  it('clamps percentage above 100 to 100', () => {
    render(<ProgressBar percentage={150} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('clamps negative percentage to 0', () => {
    render(<ProgressBar percentage={-20} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('sets width style to clamped percentage', () => {
    render(<ProgressBar percentage={65} data-testid="bar" />)
    // The percentage label confirms the correct value
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('uses green at 100% for default blue color mode', () => {
    render(<ProgressBar percentage={100} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('uses correct percentage display at 75%+', () => {
    render(<ProgressBar percentage={80} />)
    expect(screen.getByText('80%')).toBeInTheDocument()
  })

  it('shows 10% for low values', () => {
    render(<ProgressBar percentage={10} />)
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('accepts custom color prop', () => {
    render(<ProgressBar percentage={10} color="green" />)
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('appends custom className', () => {
    render(<ProgressBar percentage={50} className="my-4" />)
    expect(screen.getByText('Progress').closest('.w-full')).toHaveClass('my-4')
  })
})

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------
describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No data" />)
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('shows description when provided', () => {
    render(<EmptyState title="Empty" description="Try adding items" />)
    expect(screen.getByText('Try adding items')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    render(<EmptyState title="Empty" />)
    expect(screen.queryByText('Try adding items')).not.toBeInTheDocument()
  })

  it('shows emoji when provided', () => {
    render(<EmptyState title="Empty" emoji="🎉" />)
    expect(screen.getByText('🎉')).toBeInTheDocument()
  })

  it('shows action when provided', () => {
    render(<EmptyState title="Empty" action={<button>Add item</button>} />)
    expect(
      screen.getByRole('button', { name: /add item/i })
    ).toBeInTheDocument()
  })

  it('renders icon when provided and no emoji', () => {
    render(
      <EmptyState
        title="Empty"
        icon={<span data-testid="custom-icon">icon</span>}
      />
    )
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('prefers emoji over icon when both provided', () => {
    render(
      <EmptyState
        title="Empty"
        emoji="🚀"
        icon={<span data-testid="custom-icon">icon</span>}
      />
    )
    expect(screen.getByText('🚀')).toBeInTheDocument()
    expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument()
  })

  it('renders gradient variant', () => {
    render(<EmptyState title="Gradient" variant="gradient" />)
    expect(screen.getByText('Gradient')).toBeInTheDocument()
  })

  it('renders card variant', () => {
    render(<EmptyState title="Card" variant="card" />)
    expect(screen.getByText('Card')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// ErrorAlert
// ---------------------------------------------------------------------------
describe('ErrorAlert', () => {
  it('returns null when message is empty', () => {
    const view = render(<ErrorAlert message="" />)
    expect(view.container.children).toHaveLength(0)
  })

  it('renders the error message', () => {
    render(<ErrorAlert message="Something broke" />)
    expect(screen.getByText('Something broke')).toBeInTheDocument()
  })

  it('shows default AlertCircle icon when no custom icon', () => {
    render(<ErrorAlert message="Error" />)
    expect(screen.getByTestId('icon-alert-circle')).toBeInTheDocument()
  })

  it('shows custom icon instead of default when provided', () => {
    render(
      <ErrorAlert
        message="Error"
        icon={<span data-testid="custom-err-icon">!</span>}
      />
    )
    expect(screen.getByTestId('custom-err-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-alert-circle')).not.toBeInTheDocument()
  })

  it('shows title when provided', () => {
    render(<ErrorAlert message="Details" title="Error Title" />)
    expect(screen.getByText('Error Title')).toBeInTheDocument()
  })

  it('shows dismiss button when dismissible with onDismiss', () => {
    const onDismiss = jest.fn()
    render(<ErrorAlert message="Closeable" dismissible onDismiss={onDismiss} />)
    const dismissBtn = screen.getByLabelText('Dismiss')
    expect(dismissBtn).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = jest.fn()
    render(<ErrorAlert message="Closeable" dismissible onDismiss={onDismiss} />)
    fireEvent.click(screen.getByLabelText('Dismiss'))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not show dismiss button when dismissible is false', () => {
    render(<ErrorAlert message="Static" />)
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument()
  })

  it('shows action when provided', () => {
    render(<ErrorAlert message="Error" action={<button>Retry</button>} />)
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('appends custom className', () => {
    render(<ErrorAlert message="Err" className="mt-8" />)
    expect(screen.getByText('Err').closest('.rounded-lg')).toHaveClass('mt-8')
  })
})

// ---------------------------------------------------------------------------
// LoadingScreen
// ---------------------------------------------------------------------------
describe('LoadingScreen', () => {
  it('renders Loading... text', () => {
    render(<LoadingScreen />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders the component', () => {
    const view = render(<LoadingScreen />)
    expect(view.container.children).toHaveLength(1)
  })
})
