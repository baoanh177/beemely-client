import BannerSlider from "@/components/banner/Banner";
import BestsellerSection from "@/components/common/BestsellerSection";
import Categories from "../Components/categories/Categories";
import { Container } from "@/styles/common-styles";
import CustomerSaySlider from "@/components/common/CustomerSaySlider";
import Stories from "@/components/stories/Stories";

const Home = () => {
  return (
    <div className="space-y-20">
      <section className="banner-slide px-8">
        <BannerSlider />
      </section>
      <div className="space-y-20 pb-28">
        <Container>
          <Categories />
        </Container>
        <BestsellerSection />
        <Container>
          <CustomerSaySlider />
        </Container>
        <Container>
          <Stories />
        </Container>
      </div>
    </div>
  );
};

export default Home;
