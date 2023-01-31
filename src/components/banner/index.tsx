import { memo } from "react";
import { getBanners } from "@/services/banner.service";
import Carousel from "../carousel";
import styled from "./index.module.scss";

function Banner() {
  const { data } = getBanners();

  return (
    <Carousel className={styled.banner}>
      {data && data.data.map((item) => <img key={item.id} src={item.image} alt="banner" crossOrigin="anonymous" />)}
    </Carousel>
  );
}

export default memo(Banner);
