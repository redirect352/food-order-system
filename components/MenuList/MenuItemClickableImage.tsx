'use client';

import { Indicator, Paper } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ImageWithFallback } from '@/UI';
import ItemExtraInfoCart from '../ItemExtraInfoCard/ItemCart';
import classes from './styles.module.scss';
import { Dish } from '@/shared/types';

interface MenuItemImageProps {
  dishDescription: Dish
}

const MenuItemClickableImage: FunctionComponent<MenuItemImageProps> = (props) => {
  const { image, discount } = props.dishDescription;
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
      <ItemExtraInfoCart
        opened={opened}
        onClose={close}
        title={props.dishDescription.name}
        dish={props.dishDescription}
        />
    </>
  );
};

export default MenuItemClickableImage;
