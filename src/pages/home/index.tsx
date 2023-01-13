import Category from "../../components/home/category";
import Carousel from "../../components/carousel";
import styled from "./index.module.scss";

type Props = {};

function index({}: Props) {
  return (
    <div className={styled.home}>
      <Carousel />
      <Category />
    </div>
  );
}

export default index;
