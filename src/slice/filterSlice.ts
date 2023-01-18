import { createSlice } from "@reduxjs/toolkit";

type FilterStete = {
  keyword?: string;
  category: number[];
  price?: {
    min: number;
    max: number;
  };
};

const initialState: FilterStete = {
  keyword: "",
  category: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      const value = action.payload;
      let newCategory: number[] = [];

      const currentIndex = state.category.findIndex((item) => item === value);
      if (currentIndex === -1) newCategory = [...state.category, value];
      else newCategory = state.category.filter((item) => item !== value);

      state.category = newCategory;
    },
    setPriceRange: (state, action) => (state.price = action.payload),
  },
});

export const { setCategory } = filterSlice.actions;

export default filterSlice.reducer;
