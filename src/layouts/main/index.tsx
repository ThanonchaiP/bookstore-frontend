import { Outlet } from "react-router";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import styled from "./index.module.scss";

function MainLayout() {
  return (
    <div className={styled.container}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
