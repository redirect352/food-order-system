import { DishCategoryDto } from './dish-category.dto';
import { ImageDto } from './image/image.dto';

export type DishDto = {
  id: number,
  price: number,
  name: string,
  description: string,
  quantity: string,
  images?: ImageDto[],
  discount : number,
  calorieContent: string | number,
  externalProducer?: string,
  proteins?: number,
  fats?: number,
  carbohydrates?: number,
  bestBeforeDate?: string,
  category?: DishCategoryDto,
  providingCanteen: {
    name: string
  },
};
