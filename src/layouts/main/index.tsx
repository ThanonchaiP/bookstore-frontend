import { Fragment, Suspense } from "react";
import { Outlet } from "react-router";
import Footer from "components/footer";
import Navbar from "components/navbar";
import styled from "./index.module.scss";

function MainLayout() {
  return (
    <Fragment>
      <Navbar />
      <div className={styled.content}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </Fragment>
  );
}

export default MainLayout;
