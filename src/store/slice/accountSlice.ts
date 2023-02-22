import { toast } from "react-toastify";
import router from "routes/root";
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { LoginForm } from "@/models/auth";
import { User } from "@/models/user";
import { login } from "@/services/auth.service";
import { getCurrentUser } from "@/services/user.service";
import { RootState } from "store/configureStore";
import { fetchCartAsync } from "./cartSlice";
import { fetchFavoriteAsync } from "./favoriteSlice";

interface AccountState {
  user: User | null;
  openLoginPopup: boolean;
}

const initialState: AccountState = {
  user: null,
  openLoginPopup: false,
};

export const signInUser = createAsyncThunk<void, LoginForm>("account/signInUser", async (payload, thunkAPI) => {
  try {
    const { data } = await login(payload);
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user", data.user);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data.message });
  }
});

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const userId = localStorage.getItem("user");

      thunkAPI.dispatch(fetchCartAsync()); //fetchCart
      thunkAPI.dispatch(fetchFavoriteAsync()); //fetchFavorites

      const result = await getCurrentUser(userId!);
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

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOpenLoginPopup: (state, action) => {
      state.openLoginPopup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, () => {
      toast.success("Login Success!", { autoClose: 2000 });
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.openLoginPopup = false;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.navigate("/");
    });
    builder.addMatcher(isAnyOf(signInUser.rejected), (_, action) => {
      throw action.payload;
    });
  },
});

const openLoginPopup = (state: RootState) => state.account.openLoginPopup;
export const loginPopupSelector = createSelector([openLoginPopup], (openLoginPopup) => openLoginPopup);

const user = (state: RootState) => state.account.user;
export const userSelector = createSelector([user], (user) => user);

export const { setUser, signOut, setOpenLoginPopup } = accountSlice.actions;
export default accountSlice.reducer;
