import Button from "@/components/common/Button";
import { IoSaveOutline } from "react-icons/io5";

export const Components = () => {
  return (
    <div className="flex flex-col gap-4 pl-10">
      <div className="flex flex-col items-start gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Button</div>
        <Button shape="rectangle" text="Đây là button primary" type="primary" />
        <Button shape="rectangle" text="Đây là button secondary" type="secondary" />
        <Button shape="rectangle" text="Đây là button ghost" type="ghost" />
        <Button shape="rectangle" text="Đây là button default" type="default" />
        <Button shape="rectangle" text="Đây là button primary loading" isLoading type="primary" />
        <Button shape="rectangle" text="Đây là button secondary loading" isLoading type="secondary" />
        <Button shape="rectangle" text="Đây là button ghost loading" isLoading type="ghost" />
        <Button shape="rectangle" text="Đây là button default loading" isLoading type="default" />
        <Button shape="rectangle" text="Đây là button primary diable" isDisabled type="primary" />
        <Button shape="rectangle" text="Đây là button secondary diable" isDisabled type="secondary" />
        <Button shape="rectangle" text="Đây là button ghost diable" isDisabled type="ghost" />
        <Button shape="rectangle" text="Đây là button default diable" isDisabled type="default" />
        <Button shape="rectangle" text="Đây là button ghost có icon" icon={<IoSaveOutline />} type="ghost" />
        <Button icon={<IoSaveOutline />} shape="rounded" type="ghost" />
      </div>
    </div>
  );
};
