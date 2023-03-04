import { Fragment, memo, useEffect, useState, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "store/slice/accountSlice";
import { withTranslation, WithTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { clearCart } from "store/slice/cartSlice";
import { clearFavoriteState } from "store/slice/favoriteSlice";
import Button from "components/button";
import styles from "./index.module.scss";

const MobileMenu: FC<WithTranslation> = ({ t, i18n }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.account);

  const onChangeLanguage = () => {
    const current = i18n.language;
    i18n.changeLanguage(current === "th" ? "en" : "th");
  };

  const onOpenMenu = () => setOpen(true);
  const onCloseMenu = () => setOpen(false);

  const onLogOut = () => {
    dispatch(clearCart());
    dispatch(clearFavoriteState());
    dispatch(signOut());
    setOpen(false);
  };

  useEffect(() => {
    if (open) setOpen(false);
  }, [location.pathname]);

  return (
    <Fragment>
      {!open ? (
        <i className={`fa-solid fa-bars w-max ${styles["hamburger-icon"]}`} onClick={onOpenMenu} />
      ) : (
        <i className={`fa-solid fa-xmark w-max text-3xl ${styles["hamburger-icon"]}`} onClick={onCloseMenu} />
      )}

      <div className={`${styles["mobile-menu"]} ${open && styles.active}`}>
        {!user ? (
          <Link to="/login" className={styles["btn-login"]}>
            {t("navbar.login")}
          </Link>
        ) : (
          <div className="flex flex-col items-center bg-[#554994] py-5">
            <div className={styles["profile-img"]}>{user.firstname[0]}</div>

            <p className="font-medium text-white text-center">
              {user.firstname} {user.lastname}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-5">
          <Link className="flex justify-between items-center" to="/user/favorite">
            {t("navbar.favorite")}
            <i className="fa-solid fa-chevron-right" />
          </Link>

          {!user && (
            <Link className="flex justify-between items-center" to="/register">
              {t("navbar.register")}
              <i className="fa-solid fa-chevron-right" />
            </Link>
          )}

          {user && (
            <>
              <Link className="flex justify-between items-center" to="/user/order">
                {t("navbar.myOrder")}
                <i className="fa-solid fa-chevron-right" />
              </Link>

              <Link className="flex justify-between items-center" to="/user/profile">
                {t("navbar.manageAccount")}
                <i className="fa-solid fa-chevron-right" />
              </Link>
            </>
          )}

          <div className="flex justify-between items-center cursor-pointer" onClick={onChangeLanguage}>
            <p>{t("navbar.language")}</p>

            <div className="flex items-center gap-2">
              <p>{i18n.language === "th" ? t("navbar.thai") : t("navbar.english")}</p>
              <i className="fa-solid fa-chevron-right" />
            </div>
          </div>

          {user && <Button onClick={onLogOut}>{t("navbar.logOut")}</Button>}
        </div>
      </div>

      <div className={`${styles.overlay} ${open && styles["overlay-active"]}`} />
    </Fragment>
  );
};

export default withTranslation()(memo(MobileMenu));
