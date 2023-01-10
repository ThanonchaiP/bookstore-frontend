import Carousel from "../../components/carousel";
import styled from "./index.module.scss";

type Props = {};

function index({}: Props) {
  return (
    <div className={styled.home}>
      <Carousel />
    </div>
  );
}

export default index;
