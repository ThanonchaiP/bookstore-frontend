import { Fragment, memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../../utils/hooks/useOnClickOutside";
import styled from "./index.module.scss";

function HelpMenu() {
  const translateRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const language = [
    { title: t("navbar.thai"), value: "th" },
    { title: t("navbar.english"), value: "en" },
  ];

  const onChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  useOnClickOutside(translateRef, () => {
    if (open) setOpen(false);
  });

  return (
    <div className={styled["help-menu-container"]}>
      <ul className={styled["help-menu"]}>
        <li className="relative" ref={translateRef}>
          <p className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen((state) => !state)}>
            {t("navbar.language")} <i className="fa-solid fa-angle-down" />
          </p>

          {open && (
            <div className={styled["translate-menu"]}>
              {language.map((item, index) => (
                <Fragment key={index}>
                  <p
                    className={`${i18n.language === item.value && styled.active}`}
                    onClick={() => onChange(item.value)}
                  >
                    {item.title}
                  </p>
                  {index === 0 && <span />}
                </Fragment>
              ))}
            </div>
          )}
        </li>
        <li>|</li>
        <li>
          <Link to="/register">{t("navbar.register")}</Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/login">{t("navbar.login")}</Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(HelpMenu);
