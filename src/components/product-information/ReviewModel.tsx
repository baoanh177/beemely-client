import { message, Modal } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Star } from "lucide-react";
import Button from "../common/Button";
import * as Yup from "yup";
import UploadImage from "../form/UploadImage";
import { IReview } from "@/services/store/review/review.model";
import { IOrderItem } from "@/services/store/product/product.model";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IReview) => void;
  selectedOrderItem?: IOrderItem | null;
}

const ReviewModal = ({ isOpen, onClose, onSubmit, selectedOrderItem }: ReviewModalProps) => {
  return (
    <Modal visible={isOpen} onCancel={onClose} footer={null}>
      <h2 className="text-center text-2xl font-bold">Đánh Giá Sản Phẩm</h2>
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
        })}
        onSubmit={async (values) => {
          console.log("Form values before submit:", values);

          if (!values.images) {
            values.images = [];
          }

          if (!values.orderItemId) {
            console.error("OrderItemId is missing or invalid");
            return;
          }

          onSubmit(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="w-full">
              <p className="mt-2 text-[16px]">Đánh giá của bạn</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`mt-2 cursor-pointer ${star <= values.rates ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setFieldValue("rates", star)}
                  />
                ))}
              </div>
              <ErrorMessage name="rates" component="p" className="text-red-500" />
            </div>
            <div>
              <label className="my-2 block text-[16px]" htmlFor="content">
                Đánh giá sản phẩm
              </label>
              <ErrorMessage name="content" component="p" className="text-red-500" />
              <Field className="border-1 w-full rounded border p-2" as="textarea" id="content" name="content" />
            </div>
            <label className="mb-2 block text-[16px]" htmlFor="content">
              Hình ảnh sản phẩm
            </label>
            <div className="border-1 mb-4 rounded border border-dashed p-4">
              <UploadImage
                isMultiple
                onImageUpload={(images) => {
                  if (images.length <= 5) {
                    setFieldValue("images", images || []);
                  } else {
                    message.error("Bạn chỉ có thể tải tối đa 5 ảnh.");
                  }
                }}
              />
            </div>
            <Button type="submit" text="Gửi đi" />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ReviewModal;
