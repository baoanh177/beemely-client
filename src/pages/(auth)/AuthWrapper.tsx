import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

interface AuthWrapperProps {
  imageUrl: string;
  children: React.ReactNode;
}

const AuthWrapper = ({ imageUrl, children }: AuthWrapperProps) => {
  return (
    <section className="grid h-full grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
      <div className="relative hidden h-full w-full md:col-span-2 md:block lg:col-span-3">
        {/* TODO: Logo component */}
        <Link to="/" className="absolute inset-5 z-20 h-10 w-28">
          <img src={logo} />
        </Link>
        <img src={imageUrl} className="absolute h-full w-full object-cover" />
      </div>
      <div className="col-span-1 flex items-center md:col-span-2">{children}</div>
    </section>
  );
};

export default AuthWrapper;
