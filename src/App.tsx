import { SWRConfig } from "swr";
import { useCallback, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      dispatch(fetchCategoriesAsync());
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <p>init app....</p>;

  return (
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        <ToastContainer theme="colored" />
        <RouterProvider router={router} />
      </SWRConfig>
    </ConfigProvider>
  );
}

export default App;
