import { Link } from "react-router-dom";
import Button from "@/components/common/Button";

const NotFound = () => {
  return (
    <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-gray-800 mb-4 text-8xl font-extrabold">404</h1>
      <p className="text-gray-600 mb-8 text-xl">Không tìm thấy trang</p>
      <Link to="/" className="text-white rounded-md">
        <Button text="Về trang chủ" />
      </Link>
    </div>
  );
};

export default NotFound;
