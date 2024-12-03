import Button from "@/components/common/Button";

import CategoryCard from "@/components/common/CategoryCard";
import CustomerSaySlider from "@/components/common/CustomerSaySlider";

import FormApply from "@/components/common/Input/FormApply";
import FormCheck from "@/components/common/Input/FormCheck";
import FormInput from "@/components/common/Input/FormInput";
import Label from "@/components/common/Label";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import Services from "@/components/service/Services";
import { IoSaveOutline } from "react-icons/io5";
import Categories from "./categories/Categories";
import Stories from "@/components/stories/Stories";

export const Components = () => {
  return (
    <div className="bg-gray-10%">
      <div className="mx-auto flex max-w-[1272px] flex-col gap-4 bg-gray-10%">
        <Stories />
        <div className="flex flex-col items-start gap-4">
          <div className="mt-6">
            <Services />
          </div>

          {/* <ProductInformation /> */}

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
        <div className="">
          <div className="w-full text-3xl font-bold text-tertiary-500">Custom Say</div>
          <CustomerSaySlider />
        </div>
      </div>

      <section className="categories flex px-16">
        <Categories />
      </section>
      <div className="flex flex-col items-start gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Title</div>
        <Title text="Shop by Categories" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold text-tertiary-500">Product Card</div>
        <div className="flex w-full max-w-[1272px] flex-wrap gap-[16px] px-4 md:gap-[12px]">
          <ProductCard
            sold={0}
            slug=""
            averageRating={0}
            totalReviews={0}
            productId=""
            image="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg"
            description="Giày đá bóng"
            type="wishlist"
            regularPrice={100}
            name="Cristiano Ronaldo"
            discountPrice={80}
          />
          <ProductCard
            sold={0}
            slug=""
            averageRating={0}
            totalReviews={0}
            productId=""
            image="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg"
            description="Giày đá bóng"
            type="remove"
            regularPrice={100}
            name="Cristiano Ronaldo"
          />
          <ProductCard
            sold={0}
            slug=""
            averageRating={0}
            totalReviews={0}
            productId=""
            image=""
            description="Giày đá bóng"
            type="remove"
            regularPrice={100}
            name="Cristiano Ronaldo"
          />
          <ProductCard
            sold={0}
            slug=""
            averageRating={0}
            totalReviews={0}
            productId=""
            image="https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg"
            description="Giày đá bóng"
            type="remove"
            regularPrice={100}
            name="Cristiano Ronaldo"
          />
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
              sold={0}
              slug=""
              averageRating={0}
              totalReviews={0}
              productId=""
              image="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg"
              description="Giày đá bóng"
              type="wishlist"
              regularPrice={100}
              name="Cristiano Ronaldo"
              discountPrice={80}
            />
            <ProductCard
              sold={0}
              slug=""
              averageRating={0}
              totalReviews={0}
              productId=""
              image="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg"
              description="Giày đá bóng"
              type="remove"
              regularPrice={100}
              name="Cristiano Ronaldo"
            />
            <ProductCard
              sold={0}
              slug=""
              averageRating={0}
              totalReviews={0}
              productId=""
              image=""
              description="Giày đá bóng"
              type="remove"
              regularPrice={100}
              name="Cristiano Ronaldo"
            />
            <ProductCard
              sold={0}
              slug=""
              averageRating={0}
              totalReviews={0}
              productId=""
              image="https://kenh14cdn.com/203336854389633024/2022/1/6/27154529142922991942036028975731191338863150n-16414625147692013111737.jpg"
              description="Giày đá bóng"
              type="remove"
              regularPrice={100}
              name="Cristiano Ronaldo"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-tertiary-500">Label</div>
          <div className="flex w-full max-w-[1272px] flex-wrap gap-[16px] px-4 md:gap-[12px]">
            <Label isRequired text="Đây là Label có required" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-tertiary-500">Input number, text</div>
          <div className="flex w-full max-w-[1272px] flex-wrap gap-[16px] px-4 md:gap-[12px]">
            <FormInput placeholder="Đây là input number bị disabled" isDisabled value={"Long"} />
            <FormInput placeholder="Đây là input text" type="text" />
            <FormInput error="error!!!" placeholder="Đây là input text bị lỗi" type="text" />
            <FormInput placeholder="Đây là input text bị readonly" isReadonly type="text" />
            <FormInput placeholder="Đây là input password" type="password" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-tertiary-500">Input checkbox</div>
          <div className="flex w-full max-w-[1272px] flex-wrap gap-[16px] px-4 md:gap-[12px]">
            <FormCheck label="Đây là check box thường" />
            <FormCheck isDefaultChecked label="Đây là check box có isDefaultChecked" />
            <FormCheck isDisable label="Đây là check box có isDiable" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-tertiary-500">Input Apply</div>
          <div className="flex w-full max-w-[1272px] flex-wrap gap-[16px] px-4 md:gap-[12px]">
            <FormApply />
          </div>
        </div>
      </div>
    </div>
  );
};
