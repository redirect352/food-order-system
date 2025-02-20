import { OfficeDto } from "./office.dto";

export type OrderMainInfoDto = {
   number: number;
  issued: string;
  fullPrice: number;
  status: string;
  canCancel: boolean;
  updated: Date;
  created: Date;
  orderPositions: Array<OrderPositionMainInfoDto>;
  deliveryDestination: OfficeDto;
};

export type OrderPositionMainInfoDto = {
  count: number;
  price: number;
  discount: number;
  name: string;
};
