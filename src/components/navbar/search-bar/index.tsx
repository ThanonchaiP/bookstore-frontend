import { memo } from "react";
import { useTranslation } from "react-i18next";
import styled from "./index.module.scss";

function SearchBar() {
  const { t } = useTranslation();

  return (
    <div className={styled["search-bar"]}>
      <input type="text" placeholder={t("navbar.searchPlaceholder")!} />
      <button type="button">
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </div>
  );
}

export default memo(SearchBar);
