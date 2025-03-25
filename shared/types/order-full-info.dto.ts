import { MenuPositionDto } from './menu-position.dto';
import { OfficeDto } from './branch-office/office.dto';

export type OrderFullInfoDto = {
  number: number;
  issued: string;
  fullPrice: number;
  status: string;
  canCancel: boolean;
  updated: Date;
  created: Date;
  orderPositions: Array<OrderPositionFullInfoDto>;
  deliveryDestination: OfficeDto;
};

export type OrderPositionFullInfoDto = {
  count: number;
  menuPosition: MenuPositionDto,
  comment?: string,
};
