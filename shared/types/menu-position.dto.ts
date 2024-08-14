import { DishDto } from './dish.dto';

export type MenuPositionDto = {
  id: number,
  price: number,
  discount: number,
  dish: DishDto,
};
