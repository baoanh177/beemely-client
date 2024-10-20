import BannerSlider from "@/components/banner/Banner";
import BestsellerSection from "@/components/common/BestsellerSection";
import Categories from "../Components/categories/Categories";
import { Container } from "@/styles/common-styles";

const Home = () => {
  return (
    <div className="space-y-20">
      <section className="banner-slide px-8">
        <BannerSlider />
      </section>
      <Container>
        <Categories />
      </Container>
      <BestsellerSection />
    </div>
  );
};

export default Home;
