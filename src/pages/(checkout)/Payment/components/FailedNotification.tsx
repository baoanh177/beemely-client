import { IoWarningOutline } from "react-icons/io5";
import { Container } from "@/styles/common-styles";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import Services from "@/components/service/Services";

const FailedNotification = () => {
  return (
    <Container className="space-y-20 py-28">
      <div className="mx-auto max-w-xl">
        <div className="relative flex flex-col items-center space-y-3">
          <IoWarningOutline size={50} />
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 text-center">
              <h3 className="text-xl font-bold md:text-3xl">Thanh toán thất bại</h3>
            </div>
            <div className="mt-2 text-center text-xs font-medium md:mt-3 md:text-sm">
              <p>Vì 1 lý do nào đó bạn đã hủy thanh toán, tiến hành thanh toán lại ngay</p>
            </div>
            <Link to={"/checkout"} className="flex justify-center">
              <Button text="Thanh toán lại" className="mt-5" />
            </Link>
          </div>
        </div>
      </div>
      <Services />
    </Container>
  );
};

export default FailedNotification;
