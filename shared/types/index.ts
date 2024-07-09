import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type Dish = {
  price: number,
  name: string,
  description: string,
  quantity: string,
  image: string | StaticImport,
  discount : number,
  calorieContent: number | string,
  producerName: string,
};
