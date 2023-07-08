import { BaseType } from "../../types";
export interface UserType extends BaseType {
  userName?: string;
  desciption?: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}
