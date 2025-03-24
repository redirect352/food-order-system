import { OfficeDto } from "../office.dto";

export type EmployeeFullInfoDto = {
  id: number;
  surname: string;
  personnelNumber: string;
  name: string;
  patronymic: string;
  office: OfficeDto;
  active: boolean;
}