import { memo, ReactNode } from "react";
import classnames from "classnames";
import Slider, { Settings, CustomArrowProps } from "react-slick";
import styled from "./index.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  children?: ReactNode;
  className?: string;
};

function Carousel({ children, className = "" }: Props) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    lazyLoad: "progressive",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: styled.dot,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => <span />,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className={classnames(styled.carousel, { [className]: className })}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default Carousel;

export const NextArrow = memo(function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <span
      className={classnames(styled["arrow-container"], styled["next-arrow"], { [styled.disable]: !onClick })}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-right" />
    </span>
  );
});

export const PrevArrow = memo(function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <span
      className={classnames(styled["arrow-container"], styled["prev-arrow"], { [styled.disable]: !onClick })}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-left" />
    </span>
  );
});
