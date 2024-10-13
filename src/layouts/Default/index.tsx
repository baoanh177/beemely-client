import { Container } from "@/styles/common-styles";
// import NavBarAntd from "@/components/navbar-antd/Navbar";
import BannerSlider from "@/components/banner/Banner";
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

const DefaultLayout = () => {
  return (
    <>
      <header>
        {/* <section className="navbar-antd">
        <Container>
          <NavBarAntd />
        </Container>
      </section> */}
        <section className="navbar">
          <Container>
            <Navbar />
          </Container>
        </section>
        <section className="banner-slide px-8">
          <BannerSlider />
        </section>
        <section className="footer">
          <Footer />
        </section>
      </header>
    </>
  );
};

export default DefaultLayout;
