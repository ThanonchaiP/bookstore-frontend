import Category from "../../components/category-menu";
import Carousel from "../../components/carousel";
import styled from "./index.module.scss";

type Props = {};

function HomePage({}: Props) {
  return (
    <div className={styled.home}>
      <Carousel />
      <Category />
    </div>
  );
}

export default HomePage;
