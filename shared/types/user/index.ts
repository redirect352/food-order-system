import { EmployeeInfoDto } from "../employee/employee-info.dto";
import { OfficeDto } from "../office.dto";

export type UserOwnInfoDto = {
  id: number;
  email: string;
  employee: EmployeeInfoDto;
  office: OfficeDto;
};

export type UserMainInfoDto = UserOwnInfoDto & {
  login: string;
  role: string;
  changed: Date;
  registered: Date;
  emailConfirmed: boolean;
  activeEmployee: boolean;
};
