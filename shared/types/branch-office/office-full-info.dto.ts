import officeTypes from "./office-types";
import { OfficeDto } from "./office.dto";

export type OfficeFullInfoDto = {
  id: number,
  name: string,
  address: string,
  officeType: officeTypes,
  isAvailable: boolean,
  servingCanteen?: OfficeDto,
  changed: Date,
  created: Date,
};
