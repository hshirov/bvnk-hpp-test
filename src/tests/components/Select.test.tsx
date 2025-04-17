import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '@/components/base/Select';
import { CurrencyOption } from '@/interfaces/CurrencyOption';

describe('Select', () => {
  const placeholderText = 'Select Currency';
  const options: CurrencyOption[] = [
    { title: 'Bitcoin', value: 'BTC' },
    { title: 'Ethereum', value: 'ETH' },
    { title: 'Litecoin', value: 'LTC' }
  ];

  it('renders with placeholder', () => {
    render(
      <Select
        placeholder={placeholderText}
        value=""
        onChange={() => {}}
        options={options}
      />
    );

    expect(screen.getByDisplayValue(placeholderText)).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(
      <Select
        placeholder={placeholderText}
        value=""
        onChange={() => {}}
        options={options}
      />
    );

    options.forEach((option) => {
      expect(screen.getByRole('option', { name: option.title })).toBeInTheDocument();
    });
  });

  it('calls onChange with selected value', () => {
    const onChange = jest.fn();
    render(
      <Select
        placeholder={placeholderText}
        value=""
        onChange={onChange}
        options={options}
      />
    );

    const select = screen.getByDisplayValue(placeholderText);
    fireEvent.change(select, { target: { value: 'BTC' } });

    expect(onChange).toHaveBeenCalledWith('BTC');
  });
});
