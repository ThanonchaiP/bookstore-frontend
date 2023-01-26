import { memo, useEffect, useState } from "react";
import { Banner } from "models/banner";
import { getBanners } from "../../services/banner.service";
import Carousel from "../carousel";
import styled from "./index.module.scss";

function Banner() {
  const [data, setData] = useState<Banner[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await getBanners();
      setData(result.data);
    };

    loadData();
  }, []);

  return (
    <Carousel className={styled.banner}>
      {data.length > 0 &&
        data.map((item) => <img key={item.id} src={item.image} alt="banner" crossOrigin="anonymous" />)}
    </Carousel>
  );
}

export default memo(Banner);
