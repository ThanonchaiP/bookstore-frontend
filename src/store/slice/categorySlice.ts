import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "models/category";
import { RootState } from "store/configureStore";
import { getAll } from "../../services/category.service";

type CategoryState = {
  categories: Category[];
  categoriesLoaded: boolean;
};

export const fetchCategoriesAsync = createAsyncThunk<Category[]>(
  "category/fetchCategoriesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await getAll();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

const initialState: CategoryState = {
  categories: [],
  categoriesLoaded: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.categoriesLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.categoriesLoaded = true;
    });
    builder.addCase(fetchCategoriesAsync.rejected, (state) => {
      state.categoriesLoaded = true;
    });
  },
});

export const { setLoading } = categorySlice.actions;
export const selectCategoryState = (state: RootState) => state.category;

export default categorySlice.reducer;
