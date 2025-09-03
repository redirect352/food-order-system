import { OfficeDto } from "../branch-office/office.dto";

export type ImageTagDto = {
  id: number;
  tagName: string;
  canteen?: OfficeDto;
}