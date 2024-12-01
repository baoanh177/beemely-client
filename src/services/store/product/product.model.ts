import { EActiveStatus } from "@/shared/enums/fetchStatus";

interface IProduct {
  id: string;
  name: string;
  slug: string;
  sortDescription: string;
  description: string;
  thumbnail: string;
  minPrice?: number;
  maxPrice?: number;
  images: string[];
  tags: ITag[];
  gender: IGender;
  variants: IVariant[];
  labels: ILabel[];
  brand: IBrand;
  sold: number;
  productColors: IProductColor[];
  productSizes: ISize[];
  productType: IProductType;
  flag: string;
  status: EActiveStatus;
  dimensions: IDimensions;
  averageRating: number;
  totalReviews: number;
}

export interface IDimensions {
  weight: number;
  length: number;
  width: number;
  height: number;
}

interface IProductColor {
  id: string;
  colorId: IColor;
  imageUrl: string;
}

interface IBrand {
  id: string;
  name: string;
  image: string;
  description: string;
  slug?: string;
}

interface ILabel {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: number;
}

interface IVariant {
  id: string;
  color: IColor;
  stock: number;
  discountPrice: number;
  price: number;
  size: ISize;
}

interface ISize {
  id: string;
  name: string;
  gender: string;
}

interface IColor {
  id: string;
  name: string;
  value: string;
}

interface IGender {
  id: string;
  name: string;
  slug?: string;
  imageUrl: string;
  path: string;
}

interface ITag {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  status: number;
  parentId: null | string;
}

interface IProductType {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

interface Filter {
  gender: string[];
  productType: string[];
  color: string[];
  size: string[];
  brand: string[];
  orderBy: string;
  sort: string;
  minPrice: string;
  maxPrice: string;
  label: string;
  tag: string;
}

interface FilterChangeHandler {
  type: string;
  value: string | string[];
}

export type { IBrand, IColor, IGender, ILabel, IProduct, IProductColor, IProductType, ISize, ITag, IVariant, Filter, FilterChangeHandler };
