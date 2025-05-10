import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Filter from '@/components/Filter';
import { Vehicle } from '@/types';
import VehicleTable from '@/components/VehicleTable';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const fetchVehicles = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, { type, filter }] = queryKey;
  const params = new URLSearchParams({
    type: type || 'tracked',
    page: pageParam.toString(),
    perPage: '20'
  });
  if (filter) params.append('filter', filter);

  const res = await axios.get(
    `https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      }
    }
  );
  const rawVehicles = res.data.content.vehicles
  const locations = res.data.content.locationVehicles;

  const enriched: Vehicle[] = rawVehicles.map((v: any) => {
    const location = locations.find((l: any) => l.plate === v.plate);
    return {
      id: v.id,
      plate: v.plate,
      fleet: v.fleet || '',
      type: v.type,
      model: v.model,
      status: v.status,
      latitude: location?.lat ?? 0,
      longitude: location?.lng ?? 0,
      updatedAt: location?.createdAt || v.createdAt,
    };
  });
  
  return {
    data: enriched,
    meta: {
      currentPage: res.data.content.page,
      lastPage: res.data.content.totalPages,
    },
  };
};

export default function Home() {
  const [type, setType] = useState<'tracked' | 'others'>('tracked');
  const [filter, setFilter] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['vehicles', { type, filter }],
    queryFn: fetchVehicles,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.currentPage < lastPage?.meta?.lastPage) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
    refetchInterval: 120000,
  });

  const vehicles = (data?.pages.flatMap(page => page.data) || []).filter(v => v && v.id);

  const handleSearch = (searchText: string, selectedType: 'tracked' | 'others') => {
    setFilter(searchText);
  };  

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <Head>
        <title>Mapa Rastreador</title>
      </Head>
      <main className="bg-slate-950 min-h-screen text-white">
        <div className="flex px-10 py-6 bg-tertiary mb-4 font-inter">
          <h1 className="text-2xl font-normal">Bruno Angeloti Pires</h1>
        </div>

        <div className="flex justify-between items-center my-4 mx-10 py-6 border-b border-primary">
          <Filter
            type={type}
            onSearch={handleSearch}
            onTypeChange={(newType) => { setType(newType); setFilter(''); }}
          />
        </div>

        <div className="bg-quaternary py-4 px-6 rounded-xl mx-10 mt-10 border border-border">
          <h2 className="text-lg font-semibold mb-4">Mapa rastreador</h2>
          <Map vehicles={vehicles}/>
        </div>

        <div onScroll={handleScroll} className="mt-6 h-[300px] overflow-y-auto mx-10">
          <VehicleTable vehicles={vehicles} />
          {isFetchingNextPage && <p className="text-center py-2">Carregando...</p>}
        </div>

        
      </main>
    </>
  );
}