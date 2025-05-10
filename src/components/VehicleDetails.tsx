import { Vehicle } from '@/types';

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
};

export default function VehicleDetails({ vehicle, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl max-w-md w-full relative">
        <button aria-label="Fechar" onClick={onClose} className="absolute top-2 right-3 text-gray-500">X</button>
        <h3 className="text-xl font-bold mb-2">Detalhes do Veículo</h3>
        <p><strong>Placa:</strong> {vehicle.plate}</p>
        <p><strong>Frota:</strong> {vehicle.fleet}</p>
        <p><strong>Modelo:</strong> {vehicle.model}</p>
        <p><strong>Status:</strong> {vehicle.status}</p>
        <p><strong>Tipo:</strong> {vehicle.type}</p>
        <p><strong>Última atualização:</strong> {vehicle.updatedAt}</p>
        <a
          href={`https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`}
          target="_blank"
          className="text-blue-600 underline mt-4 inline-block"
          rel="noopener noreferrer"
        >
          Ver no Google Maps
        </a>
      </div>
    </div>
  );
}