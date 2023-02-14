import classnames from "classnames";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginPopup from "components/login-modal";
import logo from "@/assets/logo.png";
import { useNavbarViewModel } from "./ViewModel";
import HelpMenu from "./help-menu";
import MobileMenu from "./mobile-menu";
import SearchBar from "./search-bar";
import CartPopup from "./cart-popup";
import ProfileMenu from "./profile-menu";
import styles from "./index.module.scss";

const Navbar = () => {
  const { t } = useTranslation();
  const { cart, isMobile, totalPrice, user, sticky, handleOpenLoginPopup } = useNavbarViewModel();

  return (
    <Fragment>
      {!isMobile && <HelpMenu />}

      <div className={classnames(styles.navbar, { [styles.sticky]: sticky })}>
        <div className={styles.navbar__container}>
          {isMobile && <MobileMenu />}

          <Link to="/">
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>

          {!isMobile && <SearchBar />}

          <div className="flex justify-end items-center gap-5">
            {!isMobile && (
              <Fragment>
                {sticky ? (
                  user ? (
                    <ProfileMenu className="text-[#555559] font-semibold" user={user} />
                  ) : (
                    <Link to="/login" className="text-[#555559] text-base font-bold">
                      {t("navbar.login")}
                    </Link>
                  )
                ) : (
                  <i className={`fa-solid fa-heart mb-1 ${styles["favorite-icon"]}`} />
                )}
                <span className={styles["vertical-divider"]} />
              </Fragment>
            )}

            <div className="relative" ref={cart.cartPopupRef}>
              <div
                className="flex items-center gap-5 cursor-pointer hover:text-[#554994]"
                onClick={user ? cart.handleCartPopup : handleOpenLoginPopup}
              >
                <div className="relative">
                  <i className={`fa-sharp fa-solid fa-cart-shopping ${styles["cart-icon"]}`} />
                  {cart.cartState && cart.cartState.cartItems.length > 0 && (
                    <span className={styles.quantity}>{cart.cartState.cartItems.length}</span>
                  )}
                </div>

                {!isMobile && (
                  <div className={styles["total-price"]}>
                    <i className="fa-solid fa-baht-sign mr-1" />
                    <p className="font-medium">{totalPrice.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {user && <CartPopup open={cart.openCartPopup} handleCartPopup={cart.handleCartPopup} />}
            </div>
          </div>
        </div>
        {isMobile && <SearchBar />}
      </div>

      <LoginPopup />
    </Fragment>
  );
};

export default Navbar;
