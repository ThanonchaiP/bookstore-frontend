import { memo } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

type Props = {
  className?: string;
  rating: number;
};

const RatingStar = ({ rating, className }: Props) => {
  const ratingStar = Array.from({ length: 5 }).map((_, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <i className="fa-solid fa-star" />
        ) : rating >= number ? (
          <i className="fa-solid fa-star-half-stroke" />
        ) : (
          <i className="fa-regular fa-star" />
        )}
      </span>
    );
  });
  return <div className={classnames(styles.container, className)}>{ratingStar}</div>;
};

export default memo(RatingStar);
