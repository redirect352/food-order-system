'use client';

import { Indicator, IndicatorProps } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useAppSelector } from '@/shared/hooks';
import { selectFinalPrice } from '@/lib/features/cart/cartSlice';

interface CartIndicatorProps extends IndicatorProps {

}

const CartIndicator: FunctionComponent<CartIndicatorProps> = (props) => {
  const totalPrice = useAppSelector(selectFinalPrice);
  return (
    <Indicator
      label={`${totalPrice.toFixed(2)} руб.`}
      size={24}
      position="middle-end"
      offset={30}
      {...props}
    />
  );
};

export default CartIndicator;
