import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  postcode: 'NR32',
  area: 'Lowestoft',
  priceRange: [0, 1500],
  sizeRange: [0, 100],
  allowedOnRoad: false,
  allowsHeavyWaste: false,
  searchQuery: '',
  sortBy: '', 
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, setSearchQuery, setSortBy, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
