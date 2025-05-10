import { render, screen } from '@testing-library/react';
import MapPage from '@/components/Map';
import { Vehicle } from '@/types';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div data-testid="tile" />,
  Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
}));

jest.mock('leaflet', () => ({
  divIcon: jest.fn(() => ({})),
}));

// mock necessário para evitar erro de ReactDOMServer
jest.mock('react-dom/server', () => ({
  renderToString: () => '<div>MockIcon</div>',
}));

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

describe('MapPage', () => {
  it('renders map with vehicle marker and popup', () => {
    render(<MapPage vehicles={[mockVehicle]} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getAllByTestId('marker')).toHaveLength(1);
    expect(screen.getAllByTestId('popup')).toHaveLength(1);
  });

  it('renders correctly with empty vehicle list', () => {
    render(<MapPage vehicles={[]}  />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryByTestId('marker')).not.toBeInTheDocument();
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });
});
