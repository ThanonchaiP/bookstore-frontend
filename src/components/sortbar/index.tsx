import { memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gridIcon from "@/assets/grid-2.png";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";
import { Display, selectFilterState, setOrderBy } from "../../store/slice/filterSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import styled from "./index.module.scss";

type Props = {
  display?: number;
  disableDisplayIcon?: boolean;
  onDisplayChange?: (display: number) => void;
};

type SortItem = {
  id: number;
  name: string;
  value: { orderBy: string; op: string };
};

function SortBar({ display, disableDisplayIcon, onDisplayChange }: Props) {
  const ref = useRef(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { sort } = useAppSelector(selectFilterState);

  const [show, setShow] = useState(false);

  const displayList = [
    {
      id: 1,
      icon: <img className="mx-auto" src={gridIcon} alt="grid-2" width={16} height={16} />,
      value: Display.Column,
    },
    { id: 2, icon: <i className="fa-solid fa-list" />, value: Display.List },
  ];

  const handleDisplay = (value: number) => {
    if (onDisplayChange) onDisplayChange(value);
  };

  const onChange = (data: SortItem) => {
    const { id, value } = data;

    dispatch(setOrderBy({ ...value, id }));
    setShow(false);
  };

  const handleShow = () => setShow(!show);
  const handleClose = () => {
    if (show) setShow(false);
  };

  useOnClickOutside(ref, handleClose);

  const sortList = [
    { id: 1, name: t("orderByItem.newBook"), value: { orderBy: "publishedDate", op: "DESC" } },
    { id: 2, name: t("orderByItem.bestSales"), value: { orderBy: "sold", op: "DESC" } },
    { id: 3, name: t("orderByItem.priceLowToHigh"), value: { orderBy: "price", op: "ASC" } },
    { id: 4, name: t("orderByItem.priceHighToLow"), value: { orderBy: "price", op: "DESC" } },
    { id: 5, name: t("orderByItem.alphabetLowToHigh"), value: { orderBy: "name", op: "ASC" } },
    { id: 6, name: t("orderByItem.alphabetHighToLow"), value: { orderBy: "name", op: "DESC" } },
  ];

  return (
    <div className="flex items-center">
      <label className="hidden md:block">{t("sortBy")} : </label>

      <div className="relative ml-2" ref={ref}>
        <button className={`${styled["btn-dropdown"]} ${show && styled.show}`} onClick={handleShow}>
          {(sort && sortList[sort.id - 1].name) || t("sortBy")}
          <i className="sm:hidden fa-solid fa-chevron-down ml-2" />
        </button>
        <i className={`hidden sm:block fa-solid fa-chevron-down ${styled["dropdown-icon"]}`} />

        <div className={`${styled["dropdown-menu"]} ${show && styled.active}`}>
          {sortList.map((item) => (
            <p key={item.id} onClick={() => onChange(item)}>
              {item.name}
            </p>
          ))}
        </div>
      </div>

      {!disableDisplayIcon && (
        <div className="hidden md:flex items-center gap-2 ml-3">
          {displayList.map((item) => (
            <button
              key={item.id}
              className={`${styled["btn-display"]} ${item.value === display && styled["display-active"]}`}
              onClick={() => handleDisplay(item.value)}
            >
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(SortBar);
