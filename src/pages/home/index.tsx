import CategorySlider from "../../components/category-menu";
import Banner from "../../components/banner";
import styled from "./index.module.scss";
import BestSellerSlider from "./components/best-seller-slider";

function HomePage() {
  return (
    <div className={styled.home}>
      <Banner />
      <CategorySlider />
      <BestSellerSlider />
    </div>
  );
}

export default HomePage;
