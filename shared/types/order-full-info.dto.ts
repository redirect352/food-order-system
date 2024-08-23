import { MenuPositionDto } from './menu-position.dto';

export type OrderFullInfoDto = {
  number: number;
  issued: string;
  fullPrice: number;
  status: string;
  canCancel: boolean;
  updated: Date;
  created: Date;
  orderPositions: Array<OrderPositionFullInfoDto>;
};

export type OrderPositionFullInfoDto = {
  count: number;
  menuPosition: MenuPositionDto,
};
