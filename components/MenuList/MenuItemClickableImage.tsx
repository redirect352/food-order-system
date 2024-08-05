'use client';

import { Indicator, NumberFormatter, Paper } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ImageWithFallback } from '@/UI';
import { ItemExtraInfoCard } from '@/components';
import classes from './styles.module.scss';
import { Dish } from '@/shared/types';
import { useAppDispatch } from '@/shared/hooks';
import { increaseDishCount } from '@/lib/features/cart/cartSlice';
import PriceHelper from '@/shared/helpers/priceHelper';

interface MenuItemImageProps {
  dishDescription: Dish
}

const MenuItemClickableImage: FunctionComponent<MenuItemImageProps> = (props) => {
  const { id, image, discount, price } = props.dishDescription;
  const finalPrice = PriceHelper.getPriceWithDiscount(price, discount);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const addToCart = () => dispatch(increaseDishCount(id));
  return (
    <>
      <Indicator label={`-${discount}%`} size={24} offset={12} position="top-end" inline disabled={discount === 0}>
        <Paper className={classes.imageBox} pos="relative" onClick={open} data-modal-opened={opened}>
          <ImageWithFallback
            className={classes.image}
            src={image}
            alt="123"
            sizes="(max-width: 460px) 270px 270px, (max-width: 564px) 370px 370px, (min-width: 565px) 220px 220px,"
            fill
            />
        </Paper>
      </Indicator>
      <ItemExtraInfoCard
        opened={opened}
        onClose={() => { close(); addToCart(); }}
        buttonAction={close}
        title={props.dishDescription.name}
        dishId={props.dishDescription.id}
        buttonText={
          <>
            <span>В корзину за&nbsp;</span>
            <NumberFormatter
              value={finalPrice}
              decimalScale={2}
              suffix=" рубля"
            />
          </>
        }
        />
    </>
  );
};

export default MenuItemClickableImage;
