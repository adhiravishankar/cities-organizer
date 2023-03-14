import { KyResponse } from 'ky';
import { useState } from 'react';
import { SWRResponse } from 'swr';
import { createContainer, useContainer } from 'unstated-next';
import { useMap } from 'usehooks-ts';

import { NeighborhoodAPI } from '../apis/NeighborhoodAPI';
import { DerivedNeighborhood } from '../interfaces/DerivedNeighborhood';
import { DetailedNeighborhood } from '../interfaces/DetailedNeighborhood';
import { Neighborhood } from '../interfaces/Neighborhood';
import { CitiesContainer } from './CitiesStore';
import { MetrosContainer } from './MetrosStore';

export function useNeighborhoodsStore() {
  const MetrosStore = useContainer(MetrosContainer);
  const CitiesStore = useContainer(CitiesContainer);
  
  const neighborhoodAPI = new NeighborhoodAPI();

  const [neighborhoods, setNeighborhoods] = useState<DerivedNeighborhood[]>([]);
  const [neighborhoodsMap, setNeighborhoodsMap] = useMap<string, DerivedNeighborhood>();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<DetailedNeighborhood>(null);


  async function fetchNeighborhoods() {
    const response: SWRResponse = await neighborhoodAPI.neighborhoods();
    const data = response.data as DerivedNeighborhood[];
    setNeighborhoodsMap.reset();
    data.forEach((neighboorhood: DerivedNeighborhood) => setNeighborhoodsMap.set(neighboorhood.ID, neighboorhood));
  }

  async function fetchNeighborhood(id: string) {
    const response: SWRResponse = await neighborhoodAPI.getNeighborhood(id);
    setSelectedNeighborhood(response.data as DetailedNeighborhood);
  }

  async function insertNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = await neighborhoodAPI.insertNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = await response.text();
      CitiesStore.setSelectedCityArea('');
      MetrosStore.setSelectedMetroArea('');
    }
  }

  async function updateNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = await neighborhoodAPI.updateNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = await response.text();
    }
  }

  return {
    insertNeighborhood,
    neighborhoods,
    selectedNeighborhood,
  };
}

export const NeighborhoodsContainer = createContainer(useNeighborhoodsStore);
