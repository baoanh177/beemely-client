import { EActiveStatus } from "@/shared/enums/fetchStatus";

interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  images: string[];
  tags: Tag[];
  gender: IGender;
  variants: IVariant[];
  labels: ILabel[];
  brand: IBrand;
  productColors: IProductColor[];
  sortDescription: string;
  productSizes: ISize[];
  productType: IProductType;
  flag: string;
  status: EActiveStatus;
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
}

interface Tag {
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
}

export type { IBrand, IColor, IGender, ILabel, IProduct, IProductColor, IProductType, ISize, IVariant };
