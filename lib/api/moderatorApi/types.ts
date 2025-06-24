import dayjs from "dayjs";
import { OfficeDto } from "../../../shared/types";

export type CreateMenuFromDocxDto = {
  file: Blob,
  providingCanteenId: string,
  servedOffices: string[],
  name?: string,
  relevantFrom: dayjs.Dayjs | null,
  expire:  dayjs.Dayjs | null,
}
export type SearchImageTagDto = {
  searchString?: string,
  page?: number,
  pageSize?: number,
}
export type GetMenuListParams = {
  page?: number,
  pageSize?: number,
  destinationOfficeId: number;
}
export type UploadImagesDto = {
  files: File[],
  tags: CreateImageTagDto[],
  name?: string,
}

export type ExportOrdersDocxDto = {
  periodStart: string,
  periodEnd: string,
  deliveryDestinationId: string,
}
export type SearchOrdersParams = {
  periodStart?: Date;
  periodEnd?: Date;
  deliveryDestinationId?: string;
  page?: number;
  pageSize?: number;
  sortOrder?: string;
  orderBy?: string;
}
export type SearchOrderItemDto = {
  id: number;
  number: number;
  issued: string;
  fullPrice: number;
  status: string;
  canCancel: boolean;
  updated: Date;
  created: Date;
  deliveryDestination: OfficeDto;
  orderPositionsCount: number;
  clientName: string;
  clientPersonnelNumber: string;
}
export type CreateImageTagDto ={
  tagName: string;
  officeId?: number;
}