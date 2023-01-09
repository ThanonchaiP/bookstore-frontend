import { Fragment, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "./index.module.scss";

function MobileMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      {!open ? (
        <i className={`fa-solid fa-bars w-max ${styled["hamburger-icon"]}`} onClick={() => setOpen(true)} />
      ) : (
        <i className={`fa-solid fa-xmark w-max text-3xl ${styled["hamburger-icon"]}`} onClick={() => setOpen(false)} />
      )}

      <div className={`${styled["mobile-menu"]} ${open && styled.active}`}>
        <button className={styled["btn-login"]}>{t("navbar.login")}</button>
      </div>
    </Fragment>
  );
}

export default memo(MobileMenu);
