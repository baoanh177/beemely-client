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
                <Input size="large" placeholder="Nhập tên người nhận" className="border-primary-600 h-[44px]"/>
              </FormGroup>
              <FormGroup>
                <Label>Số điện thoại</Label>
                <Input size="large" placeholder="Nhập số điện thoại" className="border-primary-600 h-[44px]"/>
              </FormGroup>
              <FormGroup>
                <Label>Tỉnh/Thành phố</Label>
                <Input size="large" placeholder="Nhập tỉnh/thành phố" className="border-primary-600 h-[44px]"/>
              </FormGroup>
              <FormGroup>
                <Label>Quận/Huyện</Label>
                <Input size="large" placeholder="Nhập quận/huyện" className="border-primary-600 h-[44px]"/>
              </FormGroup>
              <FormGroup>
                <Label>Phường/Xã</Label>
                <Input size="large" placeholder="Nhập phường/xã" className="border-primary-600 h-[44px]"/>
              </FormGroup>
              <FormGroup>
                <Label>Số nhà, tên đường</Label>
                <Input size="large" placeholder="Nhập địa chỉ chi tiết" className="border-primary-600 h-[44px]"/>
              </FormGroup>
              <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
              <Button size="large"color="default" variant="solid" className="h-[52px] px-24 mt-3 self-start">Thêm Địa Chỉ</Button>
            </FormInner>
          );
        }}
      </Formik>
    </>
  );
};

export default AddressForm;
