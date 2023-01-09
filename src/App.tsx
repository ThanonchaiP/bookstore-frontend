import { RouterProvider } from "react-router";
import router from "./routes/root";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
