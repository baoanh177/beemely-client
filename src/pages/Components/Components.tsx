import Button from "@/components/common/Button";
import CategoryCard from "@/components/common/CategoryCard";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import { IoSaveOutline } from "react-icons/io5";

export const Components = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Button</div>
        <Button shape="rectangle" text="Đây là button primary" variant="primary" />
        <Button shape="rectangle" text="Đây là button secondary" variant="secondary" />
        <Button shape="rectangle" text="Đây là button ghost" variant="ghost" />
        <Button shape="rectangle" text="Đây là button default" variant="default" />
        <Button shape="rectangle" text="Đây là button danger" variant="danger" />
        <Button shape="rectangle" text="Đây là button primary loading" isLoading variant="primary" />
        <Button shape="rectangle" text="Đây là button danger loading" isLoading variant="danger" />
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
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Category Card</div>
        <div className="flex w-full max-w-[1272px] flex-wrap gap-[16px] px-4 md:gap-[12px]">
          <CategoryCard background="" name="Rosé" />
          <CategoryCard background="ads" name="Rosé" />
          <CategoryCard
            background="https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg"
            name="Rosé"
          />
          <CategoryCard
            background="https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg"
            name="Rosé"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Product Card</div>
        <div className="flex w-full max-w-[1272px] flex-wrap gap-[16px] px-4 md:gap-[12px]">
          <ProductCard
            image="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg"
            description="Giày đá bóng"
            type="wishlist"
            regularPrice={100}
            name="Cristiano Ronaldo"
            discountPrice={80}
          />
          <ProductCard
            image="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg"
            description="Giày đá bóng"
            type="remove"
            regularPrice={100}
            name="Cristiano Ronaldo"
          />
          <ProductCard image="" description="Giày đá bóng" type="remove" regularPrice={100} name="Cristiano Ronaldo" />
          <ProductCard
            image="https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg"
            description="Giày đá bóng"
            type="remove"
            regularPrice={100}
            name="Cristiano Ronaldo"
          />
        </div>
      </div>
    </div>
  );
};
