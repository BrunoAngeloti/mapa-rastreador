import { useState } from 'react';

interface Props {
  type: 'tracked' | 'others';
  onSearch: (filter: string, type: 'tracked' | 'others') => void;
  onTypeChange: (type: 'tracked' | 'others') => void;
}

export default function Filter({ type, onSearch, onTypeChange }: Props) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search.trim(), type);
  };

  return (
    <div className="flex flex-col gap-4 w-full md:flex-row md:items-center md:justify-between mt-6">
      {/* Seleção de tipo */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
        <p className="font-semibold">Lista</p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="type"
              checked={type === 'tracked'}
              onChange={() => onTypeChange('tracked')}
              className="accent-secondary"
            /> Rastreados
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="type"
              checked={type === 'others'}
              onChange={() => onTypeChange('others')}
              className="accent-secondary"
            /> Outros
          </label>
        </div>
      </div>

      {/* Campo de busca e botão */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full md:w-auto">
        <input
          placeholder="Buscar por placa ou frota"
          className="rounded py-2 px-3 text-white border-white border w-full md:w-[250px]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-secondary text-white cursor-pointer px-6 py-2 rounded-lg w-full md:w-auto"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
