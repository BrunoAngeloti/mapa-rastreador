import { render, screen, fireEvent } from '@testing-library/react';
import VehicleDetails from '@/components/VehicleDetails';
import { Vehicle } from '@/types';

const mockVehicle: Vehicle = {
  id: '1',
  plate: 'ABC1234',
  fleet: '001',
  type: 'vehicle',
  model: 'FH 460',
  status: 'active',
  latitude: -23.5,
  longitude: -46.6,
  updatedAt: '2025-05-10T12:00:00Z',
};

describe('VehicleDetails', () => {
  it('renders vehicle info', () => {
    render(<VehicleDetails vehicle={mockVehicle} onClose={() => {}} />);
    expect(screen.getByText(/placa/i)).toBeInTheDocument();
    expect(screen.getByText('ABC1234')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
    expect(screen.getByText(/FH 460/i)).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    const onClose = jest.fn();
    render(<VehicleDetails vehicle={mockVehicle} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText(/fechar/i));
    expect(onClose).toHaveBeenCalled();
  });
});
