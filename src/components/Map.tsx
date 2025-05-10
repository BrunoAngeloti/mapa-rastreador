import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Vehicle } from '@/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaTruck } from 'react-icons/fa';
import { useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

type Props = {
  vehicles: Vehicle[];
};

export default function MapPage({ vehicles }: Props) {
  const vehicleColorsRef = useRef<Map<string, string>>(new Map());

  const createTruckMarkerIcon = (color: string) =>
    L.divIcon({
      className: '',
      html: ReactDOMServer.renderToString(
        <div
          style={{
            background: color,
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid white',
            boxShadow: '0 0 4px rgba(0,0,0,0.4)',
          }}
        >
          <FaTruck color="white" size={18} />
        </div>
      ),
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

  return (
    <MapContainer
      center={[-23.55, -46.63]}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vehicles.map((vehicle) => {
        if (!vehicleColorsRef.current.has(vehicle.id)) {
          const hue = Math.floor(Math.random() * 360);
          vehicleColorsRef.current.set(vehicle.id, `hsl(${hue}, 80%, 50%)`);
        }
        const color = vehicleColorsRef.current.get(vehicle.id) || '#007bff';
        const icon = createTruckMarkerIcon(color);

        return (
          <Marker
            key={vehicle.id}
            position={[vehicle.latitude, vehicle.longitude]}
            icon={icon}
          >
            <Popup className="!bg-quartinery !text-white !rounded-md !p-4 !shadow-md">
              <div className="text-sm leading-relaxed">
                <div>
                  <strong>Placa</strong> {vehicle.plate}
                </div>
                <div>
                  <strong>Frota</strong> {vehicle.fleet || '-'}
                </div>
                <div>{new Date(vehicle.updatedAt).toLocaleString('pt-BR')}</div>
                <div
                  className="hover:underline cursor-pointer text-blue-400"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`,
                      '_blank'
                    )
                  }
                >
                  {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
