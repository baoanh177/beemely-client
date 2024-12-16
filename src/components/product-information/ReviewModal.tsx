import { message, Modal } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaStar } from "react-icons/fa";
import Button from "../common/Button";
import * as Yup from "yup";
import UploadImage from "../form/UploadImage";
import { IReview } from "@/services/store/review/review.model";
import { IOrderItem } from "@/services/store/order/order.model";
import clsx from "clsx";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IReview) => void;
  selectedOrderItem?: IOrderItem | null;
}

const ReviewModal = ({ isOpen, onClose, onSubmit, selectedOrderItem }: ReviewModalProps) => {
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} className="rounded-lg p-6">
      <h2 className="mb-4 text-center text-2xl font-bold">Đánh Giá Sản Phẩm</h2>
      <Formik
        initialValues={{
          rates: 0,
          content: "",
          images: [],
          orderItemId: selectedOrderItem?.id || "",
        }}
        validationSchema={Yup.object({
          rates: Yup.number().required("Vui lòng chọn đánh giá").min(1, "Vui lòng chọn đánh giá"),
          content: Yup.string().required("Vui lòng nhập nhận xét của bạn").trim(),
          orderItemId: Yup.string().required("OrderItemId is required"),
          images: Yup.array().min(1, "Vui lòng tải lên ít nhất 1 hình ảnh"),
        })}
        onSubmit={async (values) => {
          if (!values.orderItemId) {
            console.error("OrderItemId is missing or invalid");
            return;
          }

          onSubmit(values);
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="w-full">
              <p className="mt-2 text-base font-medium">Đánh giá của bạn</p>
              <div className="mt-2 flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={clsx(
                      "cursor-pointer transition duration-150 ease-in-out",
                      star <= values.rates ? "text-primary-600" : "text-primary-20%",
                    )}
                    size={24}
                    onClick={() => setFieldValue("rates", star)}
                  />
                ))}
              </div>
              <ErrorMessage name="rates" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <div>
              <label className="mb-1 block text-base font-medium" htmlFor="content">
                Đánh giá sản phẩm
              </label>
              <ErrorMessage name="content" component="p" className="mt-1 text-sm text-red-500" />
              <Field
                className="border-gray-300 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
                as="textarea"
                id="content"
                name="content"
                style={{
                  borderColor: "#d9d9d9",
                  backgroundColor: "#fff",
                  boxShadow: "none",
                }}
                rows={4}
                placeholder="Viết nhận xét của bạn ở đây..."
              />
            </div>
            <div>
              <label className="mb-2 block text-base font-medium">Hình ảnh sản phẩm</label>
              <div className="border-1 bg-gray-50 mb-4 rounded-lg border border-dashed p-4">
                <UploadImage
                  isMultiple
                  currentImageUrl={values.images}
                  onImageUpload={(images) => {
                    if (images.length <= 5) {
                      setFieldValue("images", images || []);
                    } else {
                      message.error("Bạn chỉ có thể tải tối đa 5 ảnh.");
                    }
                  }}
                />
                <ErrorMessage name="images" component="p" className="mt-1 text-sm text-red-500" />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button isDisabled={isSubmitting} isLoading={isSubmitting} type="submit" text="Gửi Đánh Giá" className="w-full" />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ReviewModal;
