import { create } from "zustand";

const useDataStore = create((set) => ({
  sourceData: "",
  filteredData: [],
  asset: "All",
  category: "All",
  region: "All",
  factor: "All",
  decade: 0,
  factorList: [],
  assetList: [],
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
  },
}));

export { useDataStore };
