import { Fragment, Suspense } from "react";
import { Outlet } from "react-router";
import Footer from "components/footer";
import Navbar from "components/navbar";
import ScrollToTop from "components/scroll-to-top";
import styles from "./index.module.scss";

function MainLayout() {
  return (
    <Fragment>
      <ScrollToTop />
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
