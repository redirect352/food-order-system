import { EmployeeInfoDto } from "../employee/employee-info.dto";
import { MenuPositionDto } from "../menu-position.dto";
import { OfficeDto } from "../branch-office/office.dto";

export type MenuInfoDto = {
  id: number;
  name: number;
  relevantFrom: Date;
  expire: Date;
  menuPositionsCount: number;
  user: {
    employee: EmployeeInfoDto
  };
  providingCanteen_office: OfficeDto;
  created: Date;
  changed: Date;
  menu_positions: MenuPositionDto[];
  _count:{
    menu_positions: number;
		served_offices: number;
  };
};
