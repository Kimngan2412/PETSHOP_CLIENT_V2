import { BaseType } from "../../types";
export interface CommentType extends BaseType {
  productsId?: number;
  userId?: number;
  content?: string;
}
