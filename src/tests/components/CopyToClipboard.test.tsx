import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyToClipboard } from '@/components/base/CopyToClipboard';

describe('CopyToClipboard', () => {
  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    });
  });

  test('copies text to clipboard when clicked', async () => {
    render(<CopyToClipboard textToCopy="hello world">Hello</CopyToClipboard>);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
    });
  });

  test('shows copied confirmation', async () => {
    render(<CopyToClipboard textToCopy="hello world">Hello</CopyToClipboard>);

    fireEvent.click(screen.getByRole('button'));

    await screen.findByText(/copied/i);
  });
});
