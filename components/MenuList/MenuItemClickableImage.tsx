'use client';

import { Indicator, NumberFormatter, Paper } from '@mantine/core';
import { FunctionComponent, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ImageWithFallback } from '@/UI';
import { ItemExtraInfoCard } from '@/components';
import classes from './styles.module.scss';
import { useAppDispatch } from '@/shared/hooks';
import { addToCart } from '@/lib/features/cart/cartSlice';
import PriceHelper from '@/shared/helpers/priceHelper';
import { MenuListItemContext } from './MenuItemContext';
import { ImageHelper } from '../../shared/helpers';

interface MenuItemImageProps {
}

const MenuItemClickableImage: FunctionComponent<MenuItemImageProps> = () => {
  const menuPosition = useContext(MenuListItemContext);
  const { discount, price, dish } = menuPosition;
  const finalPrice = PriceHelper.getPriceWithDiscount(price, discount);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const addItemToCart = () => dispatch(addToCart(menuPosition));
  const src = ImageHelper.getImageSrc(dish.image);
  return (
    <>
      <Indicator label={`-${discount}%`} size={24} offset={12} position="top-end" inline disabled={discount === 0}>
        <Paper className={classes.imageBox} pos="relative" onClick={open} data-modal-opened={opened}>
          <ImageWithFallback
            className={classes.image}
            src={src}
            alt={dish.image?.name ?? ''}
            sizes="(max-width: 460px) 270px 270px, (max-width: 564px) 370px 370px, (min-width: 565px) 220px 220px,"
            fill
            />
        </Paper>
      </Indicator>
      <ItemExtraInfoCard
        opened={opened}
        onClose={() => { close(); addItemToCart(); }}
        buttonAction={close}
        title={menuPosition.dish.name}
        menuPosition={menuPosition}
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
