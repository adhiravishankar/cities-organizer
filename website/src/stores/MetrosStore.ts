import { KyResponse } from 'ky';
import { useMemo, useState } from 'react';
import { SWRResponse } from 'swr';
import { createContainer } from 'unstated-next';
import { useMap } from 'usehooks-ts';

import { MetroAPI } from '../apis/MetroAPI';
import { DetailedMetro } from '../interfaces/DetailedMetro';
import { Metro } from '../interfaces/Metro';

export function useMetrosStore() {
  const metroAPI = new MetroAPI();

  const [metros, setMetros] = useState<Metro[]>([]);
  const [metrosMap, setMetrosMap] = useMap<string, Metro>();
  const [selectedMetro, setSelectedMetro] = useState<DetailedMetro>(null);
  const [selectedMetroArea, setSelectedMetroArea] = useState<string>(null);

  const metroNamesMap = useMemo(() => {
    const namesMap = new Map<string, string>();
    metrosMap.forEach((value: Metro, key: string) => namesMap.set(key, value.Name));
    return namesMap;
  }, [metrosMap]);

  async function fetchMetros() {
    const response: SWRResponse = await metroAPI.metros();
    setMetros(response.data as Metro[]);
    this.metrosMap.clear();
    this.metrosArray.forEach((metro: Metro) => setMetrosMap.set(metro.ID, metro));
  }

  function fetchMetro(id: string) {
    const response: SWRResponse = await metroAPI.getMetro(id);
    this.selectedMetro = await response.json<DetailedMetro>();
  }

  function insertMetro(name: string, extendedName: string, shortName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string) {
    const response: KyResponse = await metroAPI.insertMetro(name, extendedName, shortName, metroSizeRank, population, featuredImage, notes);
    if (response.ok) {
      const metroID = await response.text();
      const metro: Metro = { Name: name, ExtendedName: extendedName, ShortName: shortName, MetroSizeRank: metroSizeRank, Population: population, FeaturedImage: featuredImage, ID: metroID, Notes: notes };
      this.metrosMap.set(metroID, metro);
    }
  }

  function updateMetro(id: string, name: string, extendedName: string, shortName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string) {
    const success: KyResponse = await metroAPI.editMetro(id, name, extendedName, shortName, metroSizeRank, population, featuredImage, notes);
    if (success.ok) {
      const metro = this.metrosMap.get(id);
      this.metrosMap.set(id, { ...metro, Name: name, ExtendedName: extendedName, ShortName: shortName, Population: population, FeaturedImage: featuredImage });
    }
  }

  return {
    fetchMetros,
    insertMetro,
    metros,
    metroNamesMap,
    metrosMap,
    selectedMetro,
    selectedMetroArea,
    setSelectedMetroArea,
    updateMetro,
  };
}

export const MetrosContainer = createContainer(useMetrosStore);
