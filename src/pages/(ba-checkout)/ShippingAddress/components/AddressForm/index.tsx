import { Button, Checkbox, Input } from "antd";
import { Formik } from "formik";
import { FormGroup, FormInner, Label } from "./address-form.style";

const AddressForm = () => {
  const initialValues = {};
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          console.log(123);
        }}
      >
        {({}) => {
          return (
            <FormInner>
              <FormGroup>
                <Label>Tên người nhận</Label>
                <Input size="large" placeholder="Nhập tên người nhận" className="h-[44px] border-primary-600" />
              </FormGroup>
              <FormGroup>
                <Label>Số điện thoại</Label>
                <Input size="large" placeholder="Nhập số điện thoại" className="h-[44px] border-primary-600" />
              </FormGroup>
              <FormGroup>
                <Label>Tỉnh/Thành phố</Label>
                <Input size="large" placeholder="Nhập tỉnh/thành phố" className="h-[44px] border-primary-600" />
              </FormGroup>
              <FormGroup>
                <Label>Quận/Huyện</Label>
                <Input size="large" placeholder="Nhập quận/huyện" className="h-[44px] border-primary-600" />
              </FormGroup>
              <FormGroup>
                <Label>Phường/Xã</Label>
                <Input size="large" placeholder="Nhập phường/xã" className="h-[44px] border-primary-600" />
              </FormGroup>
              <FormGroup>
                <Label>Số nhà, tên đường</Label>
                <Input size="large" placeholder="Nhập địa chỉ chi tiết" className="h-[44px] border-primary-600" />
              </FormGroup>
              <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
              <Button size="large" color="default" variant="solid" className="mt-3 h-[52px] self-start px-24">
                Thêm Địa Chỉ
              </Button>
            </FormInner>
          );
        }}
      </Formik>
    </>
  );
};

export default AddressForm;
