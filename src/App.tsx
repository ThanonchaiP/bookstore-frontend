import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";
import { PRIMARY_COLOR } from "./utils/constants";
import router from "./routes/root";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      <RouterProvider router={router} />;
    </ConfigProvider>
  );
}

export default App;
