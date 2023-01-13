import { Fragment, memo, useEffect, useState, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import styled from "./index.module.scss";

const MobileMenu: FC<WithTranslation> = ({ t, i18n }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const onChangeLanguage = () => {
    const current = i18n.language;
    i18n.changeLanguage(current === "th" ? "en" : "th");
  };

  useEffect(() => {
    if (open) setOpen(false);
  }, [location.pathname]);

  return (
    <Fragment>
      {!open ? (
        <i className={`fa-solid fa-bars w-max ${styled["hamburger-icon"]}`} onClick={() => setOpen(true)} />
      ) : (
        <i className={`fa-solid fa-xmark w-max text-3xl ${styled["hamburger-icon"]}`} onClick={() => setOpen(false)} />
      )}

      <div className={`${styled["mobile-menu"]} ${open && styled.active}`}>
        <button className={styled["btn-login"]}>{t("navbar.login")}</button>

        <div className="mt-8 flex flex-col gap-5">
          <Link className="flex justify-between items-center" to="">
            {t("navbar.favorite")}
            <i className="fa-solid fa-chevron-right" />
          </Link>

          <Link className="flex justify-between items-center" to="">
            {t("navbar.register")}
            <i className="fa-solid fa-chevron-right" />
          </Link>

          <div className="flex justify-between items-center cursor-pointer" onClick={onChangeLanguage}>
            <p>{t("navbar.language")}</p>

            <div className="flex items-center gap-2">
              <p>{i18n.language === "th" ? t("navbar.thai") : t("navbar.english")}</p>
              <i className="fa-solid fa-chevron-right" />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styled.overlay} ${open && styled["overlay-active"]}`} />
    </Fragment>
  );
};

export default withTranslation()(memo(MobileMenu));
