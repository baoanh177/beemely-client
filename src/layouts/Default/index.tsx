import { Container } from "@/styles/common-styles";
import { Outlet } from "react-router-dom";
// import NavBarAntd from "@/components/navbar-antd/Navbar";

import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <section className="navbar">
          <Container>
            <Navbar />
          </Container>
        </section>
      </header>
      <main className="pt-[100px]">
        {children}
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default DefaultLayout;
