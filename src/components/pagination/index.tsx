import classnames from "classnames";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePagination, NEXT_DOTS, PREV_DOTS } from "@/hooks/usePagination";
import styled from "./index.module.scss";

type Props = {
  currentPage: number;
  pageSize?: number;
  totalCount: number;
  className?: string;
  onPageChange?: (page: number) => void;
};

const Pagination = (props: Props) => {
  const { totalCount, currentPage, pageSize = 20, className = "", onPageChange } = props;
  const { t } = useTranslation();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize,
  });

  let lastPage = paginationRange![paginationRange!.length - 1];

  if (currentPage === 0 || paginationRange!.length < 2) return null;

  const onNext = () => {
    if (onPageChange) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (onPageChange && currentPage !== 1) onPageChange(currentPage - 1);
  };

  const onClickDots = (value: string) => {
    switch (value) {
      case NEXT_DOTS:
        if (onPageChange) onPageChange(currentPage + 4);
        break;
      case PREV_DOTS:
        const page = currentPage - 5;
        if (onPageChange) onPageChange(page < 1 ? 1 : page);
        break;
      default:
        break;
    }
  };

  return (
    <ul className={classnames(styled["pagination-container"], { [className]: className })}>
      <li
        className={classnames(styled["pagination-item"], {
          [styled.disabled]: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left select-none">{t("previous")}</div>
      </li>

      {paginationRange &&
        paginationRange.map((pageNumber, index) => {
          if (pageNumber === NEXT_DOTS || pageNumber === PREV_DOTS) {
            return (
              <li
                key={index}
                className={`${styled["pagination-item"]} font-bold`}
                onClick={() => onClickDots(pageNumber)}
              >
                ...
              </li>
            );
          }

          return (
            <li
              key={index}
              className={classnames(styled["pagination-item"], {
                [styled.selected]: pageNumber === currentPage,
              })}
              onClick={() => (onPageChange ? onPageChange(+pageNumber) : {})}
            >
              {pageNumber}
            </li>
          );
        })}

      <li
        className={classnames(styled["pagination-item"], {
          [styled.disabled]: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right select-none">{t("next")}</div>
      </li>
    </ul>
  );
};

export default memo(Pagination);
