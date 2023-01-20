import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/configureStore";

export enum Display {
  Column = 1,
  List = 2,
}

type FilterStete = {
  keyword?: string;
  category: number[];
  display: number;
  price?: { min: number; max: number };
  sort?: {
    id: number;
    orderBy: string;
    op: string;
  };
};

const initialState: FilterStete = {
  keyword: "",
  category: [],
  display: Display.Column,
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
    setPriceRange: (state, action) => {
      state.price = action.payload;
    },
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
    setOrderBy: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategory, setDisplay, setOrderBy, setPriceRange } = filterSlice.actions;
export const selectFilterState = (state: RootState) => state.filter;

export default filterSlice.reducer;
