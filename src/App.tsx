import { SWRConfig } from "swr";
import { useCallback, useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { fetcher } from "utils/http-client";
import { PRIMARY_COLOR } from "./utils/constants";
import { useAppDispatch } from "./store/configureStore";
import { fetchCategoriesAsync } from "./store/slice/categorySlice";
import { fetchCurrentUser } from "./store/slice/accountSlice";
import router from "./routes/root";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      dispatch(fetchCategoriesAsync());
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        <ToastContainer theme="colored" autoClose={4000} pauseOnFocusLoss={false} pauseOnHover={false} />
        <RouterProvider router={router} />
      </SWRConfig>
    </ConfigProvider>
  );
}

export default App;
