import { Fragment } from "react";
import { Link } from "react-router-dom";
import LoginPopup from "components/login-modal";
import logo from "@/assets/logo.png";
import { useNavbarViewModel } from "./ViewModel";
import HelpMenu from "./help-menu";
import MobileMenu from "./mobile-menu";
import SearchBar from "./search-bar";
import CartPopup from "./cart-popup";
import styled from "./index.module.scss";

const Navbar = () => {
  const { cart, isMobile, totalPrice, user, handleOpenLoginPopup } = useNavbarViewModel();

  return (
    <Fragment>
      {!isMobile && <HelpMenu />}

      <div className={styled.navbar}>
        <div className={styled.navbar__container}>
          {isMobile && <MobileMenu />}

          <Link to="/">
            <img src={logo} alt="logo" className={styled.logo} />
          </Link>

          {!isMobile && <SearchBar />}

          <div className="flex justify-end items-center gap-5">
            {!isMobile && (
              <Fragment>
                <i className={`fa-solid fa-heart mb-1 ${styled["favorite-icon"]}`} />
                <span className={styled["vertical-divider"]} />
              </Fragment>
            )}

            <div className="relative" ref={cart.cartPopupRef}>
              <div
                className="flex items-center gap-5 cursor-pointer hover:text-[#554994]"
                onClick={user ? cart.handleCartPopup : handleOpenLoginPopup}
              >
                <div className="relative">
                  <i className={`fa-sharp fa-solid fa-cart-shopping ${styled["cart-icon"]}`} />
                  {cart.cartState && cart.cartState.cartItems.length > 0 && (
                    <span className={styled.quantity}>{cart.cartState.cartItems.length}</span>
                  )}
                </div>

                {!isMobile && (
                  <div className={styled["total-price"]}>
                    <i className="fa-solid fa-baht-sign mr-1" />
                    <p className="font-medium">{totalPrice.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {user && <CartPopup open={cart.openCartPopup} handleCartPopup={cart.handleCartPopup} />}
            </div>
          </div>
        </div>
        {isMobile && <SearchBar className="mt-4" />}
      </div>

      <LoginPopup />
    </Fragment>
  );
};

export default Navbar;
