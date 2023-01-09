import { Fragment } from "react";
import logo from "@/assets/logo.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import HelpMenu from "./help-menu";
import styled from "./index.module.scss";
import MobileMenu from "./mobile-menu";
import SearchBar from "./search-bar";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Fragment>
      {!isMobile && <HelpMenu />}

      <div className={styled.navbar}>
        {isMobile && <MobileMenu />}

        <img src={logo} alt="logo" className={styled.logo} />

        {!isMobile && <SearchBar />}

        <div className="flex justify-end items-center gap-5">
          {!isMobile && (
            <Fragment>
              <i className={`fa-solid fa-heart mb-1 ${styled["favorite-icon"]}`} />
              <span className={styled["vertical-divider"]} />
            </Fragment>
          )}

          <div className="relative">
            <i className={`fa-sharp fa-solid fa-cart-shopping ${styled["cart-icon"]}`} />
            <span className={styled.quantity}>5</span>
          </div>

          {!isMobile && (
            <div className={styled["total-price"]}>
              <i className="fa-solid fa-baht-sign mr-1" />
              <p>0.00</p>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
