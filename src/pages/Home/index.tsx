import BannerSlider from "@/components/banner/Banner";
import BestsellerSection from "@/components/common/BestsellerSection";
import CustomerSaySlider from "@/components/common/CustomerSaySlider";
import Stories from "@/components/stories/Stories";
import { Container } from "@/styles/common-styles";
import Categories from "../Components/categories/Categories";
import Services from "@/components/service/Services";
import ProductInterest from "@/components/common/ProductInterest";

const Home = () => {
  return (
    <div className="mb-12 space-y-20">
      <section className="banner-slide px-8">
        <BannerSlider />
      </section>
      <Container>
        <Categories />
      </Container>
      <BestsellerSection />
      <ProductInterest />
      <div className="bg-[#FAFAFB] pb-8 pt-8">
        <Container>
          <CustomerSaySlider />
        </Container>
      </div>
      <div className="md:(px-5) mx-auto max-w-[1440px] px-4">
        <div className="mt-4 flex flex-col gap-24">
          <Stories />
          <Services />
        </div>
      </div>
    </div>
  );
};

export default Home;
