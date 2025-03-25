import { OfficeDto } from "../branch-office/office.dto";

export type EmployeeFullInfoDto = {
  id: number;
  surname: string;
  personnelNumber: string;
  name: string;
  patronymic: string;
  office: OfficeDto;
  active: boolean;
  changed: Date;
  created: Date;
}