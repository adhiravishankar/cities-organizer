import { KyResponse } from 'ky';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { NeighborhoodAPI } from '../apis/NeighborhoodAPI';
import { DerivedNeighborhood } from '../interfaces/DerivedNeighborhood';
import { DetailedNeighborhood } from '../interfaces/DetailedNeighborhood';
import { Neighborhood } from '../interfaces/Neighborhood';

export function useNeighborhoodsStore() {
  const neighborhoodAPI = new NeighborhoodAPI();

  const [neighborhoods, setNeighborhoods] = useState<DerivedNeighborhood[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<DetailedNeighborhood>(null);


  function fetchNeighborhoods() {
    const response: KyResponse = await this.neighborhoodAPI.neighborhoods();
    this.neighborhoodsArray = await response.json<DerivedNeighborhood[]>();
    this.neighborhoodsMap.clear();
    this.neighborhoodsArray.forEach((neighboorhood: DerivedNeighborhood) => this.neighborhoodsMap.set(neighboorhood.ID, neighboorhood));
  }

  function fetchNeighborhood(id: string) {
    const response: KyResponse = await this.neighborhoodAPI.getNeighborhood(id);
    this.selectedNeighborhood = await response.json<DetailedNeighborhood>();
  }

  function insertNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = await this.neighborhoodAPI.insertNeighborhood(neighborhood);
    if (response.ok) {
      const neighborhoodID = await response.text();
      this.updateSelectedCity('');
      this.updateSelectedMetro('');
    }
  }

  function updateNeighborhood(neighborhood: Neighborhood) {
    const response: KyResponse = await this.neighborhoodAPI.updateNeighborhood(neighborhood);
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
