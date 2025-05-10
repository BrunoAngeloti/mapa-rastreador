import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VehicleTable from '@/components/VehicleTable';
import { Vehicle } from '@/types';

const vehicles: Vehicle[] = [
  {
    id: '1',
    plate: 'ABC1234',
    fleet: '000001',
    type: 'vehicle',
    model: 'FH 460',
    status: 'active',
    latitude: -23.5,
    longitude: -46.6,
    updatedAt: '2025-05-10T12:00:00Z'
  },
];

describe('VehicleTable', () => {
  it('renders table headers', () => {
    render(<VehicleTable vehicles={vehicles} />);
    expect(screen.getByText(/placa/i)).toBeInTheDocument();
    expect(screen.getByText(/frota/i)).toBeInTheDocument();
    expect(screen.getByText(/tipo/i)).toBeInTheDocument();
    expect(screen.getByText(/modelo/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it('renders vehicle data', () => {
    render(<VehicleTable vehicles={vehicles} />);
    expect(screen.getByText('ABC1234')).toBeInTheDocument();
    expect(screen.getByText('000001')).toBeInTheDocument();
    expect(screen.getByText('Motor')).toBeInTheDocument();
    expect(screen.getByText('FH 460')).toBeInTheDocument();
    expect(screen.getByText('Em viagem')).toBeInTheDocument();
  });
});
