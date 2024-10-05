import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import { IoSaveOutline } from "react-icons/io5";

export const Components = () => {
  return (
    <div className="flex flex-col gap-4 pl-10">
      <div className="flex flex-col items-start gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Button</div>
        <Button shape="rectangle" text="Đây là button primary" variant="primary" />
        <Button shape="rectangle" text="Đây là button secondary" variant="secondary" />
        <Button shape="rectangle" text="Đây là button ghost" variant="ghost" />
        <Button shape="rectangle" text="Đây là button default" variant="default" />
        <Button shape="rectangle" text="Đây là button primary loading" isLoading variant="primary" />
        <Button shape="rectangle" text="Đây là button secondary loading" isLoading variant="secondary" />
        <Button shape="rectangle" text="Đây là button ghost loading" isLoading variant="ghost" />
        <Button shape="rectangle" text="Đây là button default loading" isLoading variant="default" />
        <Button shape="rectangle" text="Đây là button primary diable" isDisabled variant="primary" />
        <Button shape="rectangle" text="Đây là button secondary diable" isDisabled variant="secondary" />
        <Button shape="rectangle" text="Đây là button ghost diable" isDisabled variant="ghost" />
        <Button shape="rectangle" text="Đây là button default diable" isDisabled variant="default" />
        <Button shape="rectangle" text="Đây là button ghost có icon" icon={<IoSaveOutline />} variant="ghost" />
        <Button icon={<IoSaveOutline />} shape="rounded" variant="ghost" />
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Title</div>
        <Title text="Shop by Categories" />
      </div>
    </div>
  );
};
