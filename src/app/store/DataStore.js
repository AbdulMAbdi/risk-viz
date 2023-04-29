import { create } from "zustand";

const useDataStore = create((set, get) => ({
  sourceData: "",
  filteredData: [],
  averagedData: {},
  sumedData: {},
  asset: "All",
  category: "All",
  region: "All",
  factor: "All",
  decade: 0,
  factorList: [],
  assetList: [],
  factorCount: {},
  actions: {
    updateAsset: (asset) => set(() => ({ asset: asset })),
    updateCategory: (category) => set(() => ({ category: category })),
    updateRegion: (region) => set(() => ({ region: region })),
    updateFactor: (factor) => set(() => ({ factor: factor })),
    updateDecade: (decade) => set(() => ({ decade: decade })),
    updateSourceData: (data) => set(() => ({ sourceData: data })),
    updateFactorList: (factorList) => set(() => ({ factorList: factorList })),
    updateAssetList: (assetList) => set(() => ({ assetList: assetList })),
    filterData: () =>
      set((state) => ({
        filteredData: state.sourceData.filter((point) => {
          return (
            ((point["Year"] - state.decade < 10 &&
              point["Year"] - state.decade >= 0) ||
            state.decade == 0
              ? point
              : null) &&
            (point["Business Category"] == state.category ||
            state.category == "All"
              ? point
              : null) &&
            (point["Asset Name"] == state.asset || state.asset == "All"
              ? point
              : null) &&
            (point["Region"] == state.region || state.region == "All"
              ? point
              : null) &&
            (state.factor in point["Risk Factors"] || state.factor == "All"
              ? point
              : null)
          );
        }),
      })),
    sumData: () => {
      const sumedData = {};
      get().filteredData.map((point) => {
        for (const prop in point["Risk Factors"]) {
          if (!sumedData.hasOwnProperty(prop)) {
            sumedData[prop] = point["Risk Factors"][prop];
          } else {
            sumedData[prop] += point["Risk Factors"][prop];
          }
        }
      }),
        set((state) => ({
          sumedData: sumedData,
        }));
    },
    updateFactorCount: () => {
      const factorCount = {};
      get().factorList.map((factor) => {
        get().filteredData.forEach((point) => {
          if (point["Risk Factors"].hasOwnProperty(factor)) {
            if (!factorCount[factor]) {
              factorCount[factor] = 1;
            } else {
              factorCount[factor] += 1;
            }
          }
        });
      });
      set((state) => ({
        factorCount: factorCount,
      }));
    },

    averageData: () => {
      const averagedData = {};
      for (const prop in get().sumedData) {
        if (get().factorCount.hasOwnProperty(prop)) {
          averagedData[prop] = get().sumedData[prop] / get().factorCount[prop];
        } else {
          averagedData[prop] = 0;
        }
      }
      set((state) => ({
        averagedData: averagedData,
      }));
    },
  },
}));

export { useDataStore };
