import { Vehicle } from '@/types';

interface Props {
  vehicles: Vehicle[];
}

export default function VehicleTable({ vehicles }: Props) {
  return (
    <div className="overflow-x-auto mt-6 rounded-xl border border-border">
      <table className="w-full min-w-[700px] text-sm text-left text-white border-separate border-spacing-0">
        <thead>
          <tr>
            {['Placa', 'Frota', 'Tipo', 'Modelo', 'Status'].map((title) => (
              <th
                key={title}
                className="px-4 py-3 text-xs uppercase text-gray-400 text-center bg-quaternary border border-border whitespace-nowrap"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="px-4 py-3 text-center bg-quaternary border border-border whitespace-nowrap">
                {vehicle.plate}
              </td>
              <td className="px-4 py-3 text-center bg-quaternary border border-border whitespace-nowrap">
                {vehicle.fleet?.padStart(6, '0')}
              </td>
              <td className="px-4 py-3 text-center bg-quaternary border border-border whitespace-nowrap">
                {vehicle.type === 'implement' ? 'Implemento' : 'Motor'}
              </td>
              <td className="px-4 py-3 text-center bg-quaternary border border-border whitespace-nowrap">
                {vehicle.model}
              </td>
              <td className="px-4 py-3 text-center bg-quaternary border border-border whitespace-nowrap">
                {vehicle.status === 'active' ? 'Em viagem' : 'Indefinido'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
