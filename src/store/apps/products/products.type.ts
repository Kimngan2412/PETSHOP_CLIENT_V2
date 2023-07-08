import { BaseType } from "../../types";
export interface ProductType extends BaseType {
  productName?: string;
  desciption?: string;
  originalPrice?: string;
  size?: string;
  quantity?: number;
  images?: { url: string }[];
}
