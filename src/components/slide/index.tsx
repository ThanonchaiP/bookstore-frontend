import classnames from "classnames";
import { memo, ReactNode, useCallback, useState } from "react";
import Slider, { Settings } from "react-slick";
import { NextArrow, PrevArrow } from "../carousel";

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: (id: string | number) => void;
};

function Slide({ children, className = "", onClick }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onClickCard = useCallback(
    (id: number | string) => (e: React.SyntheticEvent) => {
      if (dragging) {
        e.stopPropagation();
        return;
      }

      console.log("Id : ", id);
    },
    [dragging]
  );

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyLoad: "progressive",
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className={classnames({ [className]: className })}>
      {children}
    </Slider>
  );
}

export default memo(Slide);
