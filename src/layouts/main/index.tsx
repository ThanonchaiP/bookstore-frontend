import { Fragment, Suspense } from "react";
import { Outlet } from "react-router";
import Footer from "components/footer";
import Navbar from "components/navbar";
import styles from "./index.module.scss";

function MainLayout() {
  return (
    <Fragment>
      <Navbar />
      <div className={styles.content}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </Fragment>
  );
}

export default MainLayout;
