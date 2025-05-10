import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '@/components/Filter';

describe('Filter', () => {
  const defaultProps = {
    type: 'tracked' as const,
    onSearch: jest.fn(),
    onTypeChange: jest.fn(),
  };

  it('renders filter inputs', () => {
    render(<Filter {...defaultProps} />);
    expect(screen.getByPlaceholderText(/placa ou frota/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rastreado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/outros/i)).toBeInTheDocument();
  });

  it('calls onSearch with correct values', () => {
    const onSearch = jest.fn();
    render(<Filter {...defaultProps} onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/placa ou frota/i);
    fireEvent.change(input, { target: { value: 'ABC1234' } });

    fireEvent.click(screen.getByText(/Novo/i));
    expect(onSearch).toHaveBeenCalledWith('ABC1234', 'tracked');
  });

  it('calls onTypeChange when selecting outro', () => {
    const onTypeChange = jest.fn();
    render(<Filter {...defaultProps} onTypeChange={onTypeChange} />);

    fireEvent.click(screen.getByLabelText(/outros/i));
    expect(onTypeChange).toHaveBeenCalledWith('others');
  });
});
