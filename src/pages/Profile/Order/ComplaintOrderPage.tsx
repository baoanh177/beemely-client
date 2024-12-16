import { Formik, Form, ErrorMessage } from "formik";
import { message } from "antd";
import * as Yup from "yup";
import { COMPLAINT_REASONS, EComplaintReason } from "@/services/store/complaint/complaint.model";
import UploadImage from "@/components/form/UploadImage";
import FormInputArea from "@/components/form/FormInputArea";
import Button from "@/components/common/Button";
import FormSelect from "@/components/common/Input/FormSelect";
import { useArchive } from "@/hooks/useArchive";
import { IComplaintInitialState, resetStatus } from "@/services/store/complaint/complaint.slice";
import { createNewComplaint } from "@/services/store/complaint/complaint.thunk";
import { useParams } from "react-router-dom";
import useFetchStatus from "@/hooks/useFetchStatus";

interface ComplaintFormValues {
  reason: EComplaintReason;
  description: string;
  images?: string[];
}

const validationSchema = Yup.object().shape({
  reason: Yup.string().oneOf(Object.values(EComplaintReason), "Lý do không hợp lệ").required("Vui lòng chọn lý do khiếu nại"),
  description: Yup.string().required("Vui lòng mô tả chi tiết").min(10, "Mô tả phải từ 10 ký tự trở lên"),
  images: Yup.array().min(1, "Vui lòng tải ít nhất 1 hình ảnh").max(5, "Bạn chỉ có thể tải tối đa 5 ảnh"),
});

const ComplaintOrderPage = () => {
  const { state, dispatch } = useArchive<IComplaintInitialState>("complaints");
  const { orderId } = useParams<{ orderId: string }>();

  const handleSubmit = (values: ComplaintFormValues) => {
    if (validationSchema.validateSync(values)) {
      dispatch(
        createNewComplaint({
          body: {
            ...values,
            orderId: orderId,
          },
        }),
      );
    }
  };
  useFetchStatus({
    module: "complaints",
    reset: resetStatus,
    actions: {
      success: {
        message: "Gửi khiếu nại thành công",
        navigate: "/profile/orders",
      },
      error: {
        message: state.message,
      },
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <h3 className="text-2xl font-medium">Khiếu nại đơn hàng</h3>
      <Formik
        initialValues={{
          reason: "" as EComplaintReason,
          description: "",
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, touched, errors }) => {
          return (
            <Form className="flex flex-col space-y-4">
              <FormSelect
                options={COMPLAINT_REASONS}
                isRequired
                label="Lí do khiếu nại"
                value={values.reason}
                placeholder="Chọn lí do khiếu nại"
                onChange={(value) => {
                  setFieldValue("reason", value as EComplaintReason);
                }}
                error={touched.reason ? errors.reason : ""}
              />
              <FormInputArea
                label="Nhập mô tả chi tiết lí do khiếu nại"
                placeholder="Nhập ghi chú..."
                name="description"
                className="w-full"
                value={values.description}
                error={touched.description ? errors.description : ""}
                onChange={(e) => setFieldValue("description", e)}
              />

              <div className="">
                <label className="text-sm font-medium">Hình ảnh khiếu nại</label>
                <div className="rounded-md border border-dashed border-primary-20%">
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
                </div>
                <ErrorMessage name="images" component="div" className="mt-1 text-sm font-normal text-red-500" />
              </div>
              <Button type="submit" text="Gửi khiếu nại" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ComplaintOrderPage;
