import { EmployeeInfoDto } from "../employee/employee-info.dto";
import { OfficeDto } from "../office.dto";

export type MenuListDto = {
  page: number;
  totalPages: number;
  menuList: MenuListItem[]
};
export type MenuListItem = {
  id: number;
  name: number;
  relevantFrom: Date;
  expire: Date;
  menuPositionsCount: number;
  author: EmployeeInfoDto;
  providingCanteen: OfficeDto;
  created: Date;
};
