'use client';

import { FunctionComponent } from 'react';
import { NoContentPage } from '@/components';
import noOrdersImage from '@/public/204Order.png';

const OrdersHistory : FunctionComponent = () => (
    <NoContentPage
      buttonLabel="В меню"
      href="menu"
      label="История заказов отсутствует :("
      img={noOrdersImage}
    />
  );

export default OrdersHistory;
