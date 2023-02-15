import { Favorite } from "@/models/favorite";
import { addFavorite, getFavorites, removeFavorite } from "@/services/favorite.service";
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "store/configureStore";

type FavoriteState = {
  favorites: Favorite[];
};

const initialState: FavoriteState = {
  favorites: [],
};

export const fetchFavoriteAsync = createAsyncThunk(
  "favorite/fetchFavoriteAsync",
  async (_, thunkAPI) => {
    try {
      const result = await getFavorites();
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const addFavoriteAsync = createAsyncThunk<void, { bookId: string }, { state: RootState }>(
  "favorite/addFavoriteAsync",
  async ({ bookId }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().account;
      const payload = { userId: user!.id, bookId };
      await addFavorite(payload);
      await thunkAPI.dispatch(fetchFavoriteAsync());
      toast.success("Product was added to your favorites.");
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const removeFavoriteAsync = createAsyncThunk<void, { favoriteId: string }>(
  "favorite/removeFavoriteAsync",
  async ({ favoriteId }, thunkAPI) => {
    try {
      await removeFavorite(favoriteId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    clearFavoriteState: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteAsync.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    builder.addCase(removeFavoriteAsync.fulfilled, (state, action) => {
      const { favoriteId } = action.meta.arg;
      const itemIndex = state.favorites.findIndex((i) => i.id === favoriteId);
      state.favorites.splice(itemIndex, 1);
    });
  },
});

export const { clearFavoriteState } = favoriteSlice.actions;

export default favoriteSlice.reducer;
