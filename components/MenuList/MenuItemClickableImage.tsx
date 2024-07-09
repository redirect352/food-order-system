'use client';

import { Indicator, NumberFormatter, Paper } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ImageWithFallback } from '@/UI';
import ItemExtraInfoCard from '../ItemExtraInfoCard/ItemCard';
import classes from './styles.module.scss';
import { Dish } from '@/shared/types';

interface MenuItemImageProps {
  dishDescription: Dish
}

const MenuItemClickableImage: FunctionComponent<MenuItemImageProps> = (props) => {
  const { image, discount, price } = props.dishDescription;
  const finalPrice = (price * (100 - discount)) / 100;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Indicator label={`-${discount}%`} size={24} offset={12} position="top-end" inline disabled={discount === 0}>
        <Paper className={classes.imageBox} pos="relative" onClick={open} data-modal-opened={opened}>
          <ImageWithFallback
            className={classes.image}
            src={image}
            alt="123"
            fill
            />
        </Paper>
      </Indicator>
      <ItemExtraInfoCard
        opened={opened}
        onClose={close}
        buttonAction={close}
        title={props.dishDescription.name}
        dish={props.dishDescription}
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
