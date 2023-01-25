import Category from "../../components/category-menu";
import Banner from "../../components/banner";
import styled from "./index.module.scss";

function HomePage() {
  return (
    <div className={styled.home}>
      <Banner />
      <Category />
    </div>
  );
}

export default HomePage;
