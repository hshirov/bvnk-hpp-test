import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/base/Button';

describe('Button', () => {
  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Submit</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick when in loading state', () => {
    const handleClick = jest.fn();
    render(
      <Button
        isLoading
        onClick={handleClick}
      >
        Submit
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('merges custom className with default styles', () => {
    render(<Button className="custom-class">Test</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  it('is focusable via keyboard', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  it('has an accessible name from the button text', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('supports aria attributes', () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('is correctly disabled and announced as such', () => {
    render(<Button disabled>Send</Button>);
    const button = screen.getByRole('button', { name: /send/i });
    expect(button).toBeDisabled();
  });
});
