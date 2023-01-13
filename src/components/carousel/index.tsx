import Slider, { Settings, CustomArrowProps } from "react-slick";
import styled from "./index.module.scss";
import banner1 from "@/assets/banner/1.jpg";
import banner2 from "@/assets/banner/2.jpg";
import banner3 from "@/assets/banner/3.png";
import banner4 from "@/assets/banner/4.jpg";
import banner5 from "@/assets/banner/5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

function Carousel({}: Props) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
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
    <div className={styled.carousel}>
      <Slider {...settings}>
        <img src={banner1} alt="banner" />
        <img src={banner2} alt="banner" />
        <img src={banner3} alt="banner" />
        <img src={banner4} alt="banner" />
        <img src={banner5} alt="banner" />
      </Slider>
    </div>
  );
}

export default Carousel;

export function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <span className={`${styled["arrow-container"]} ${styled["next-arrow"]}`} onClick={onClick}>
      <i className="fa-solid fa-angle-right" />
    </span>
  );
}

export function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <span className={`${styled["arrow-container"]} ${styled["prev-arrow"]}`} onClick={onClick}>
      <i className="fa-solid fa-angle-left" />
    </span>
  );
}
