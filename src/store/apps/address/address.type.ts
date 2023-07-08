import { BaseType } from "../../types";
export interface AddressType extends BaseType {
  city?: string;
  streetNo?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  userId?: number;
  note?: string;
}
