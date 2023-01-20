import type { Metro } from "@/interfaces/Metro";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { MetroAPI } from "@/apis/MetroAPI";

export const useMetrosStore = defineStore("metros", () => {
  const metroAPI = new MetroAPI(process.env.BASE_URL ?? "");
  const metros = ref(new Map<string, Metro>());
  const selectedMetro = ref();
  const metroNames = computed(function () {
    const metroNamesMap = new Map<string, string>();
    metros.value.forEach((value: Metro) =>
      metroNamesMap.set(value.ID, value.Name)
    );
    return metroNamesMap;
  });
  async function getMetros() {
    const metroResponse = await metroAPI.metros();
    if (metroResponse.ok) {
      metros.value.clear();
      const metroWrapper = await metroResponse.json<Metro[]>();
      metroWrapper.forEach((metro: Metro) => metros.value.set(metro.ID, metro));
    }
  }
  async function getMetro(id: string) {
    const metroResponse = await metroAPI.getMetro(id);
    if (metroResponse.ok) {
      selectedMetro.value = metroResponse.json<Metro[]>();
    }
  }
  return { metros, metroNames, getMetros, getMetro };
});
