import { SWRConfig } from "swr";
import { useCallback, useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";
import { fetcher } from "utils/http-client";
import { PRIMARY_COLOR } from "./utils/constants";
import { useAppDispatch } from "./store/configureStore";
import { fetchCategoriesAsync } from "./store/slice/categorySlice";
import router from "./routes/root";

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCategoriesAsync());
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
        <RouterProvider router={router} />
      </SWRConfig>
    </ConfigProvider>
  );
}

export default App;
