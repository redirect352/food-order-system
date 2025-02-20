'use client';

import { ModalProps } from '@mantine/core';
import React, { FunctionComponent, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { OrderDetailedContext } from './context/OrderDetailedContext';
import DesktopModal from './Desktop/DesktopModal';
import { useLazyGetOrderInfoQuery } from '@/lib/api/orderApi';
import MobileOrderModal from './Mobile/MobileModal';
import moment from 'moment';

interface OrderDetailedInfoCardProps extends ModalProps {
  orderNumber: number,
  orderIssued: string,
}

const OrderDetailedInfoCard: FunctionComponent<OrderDetailedInfoCardProps> =
  ({ orderNumber, orderIssued, ...modalProps }) => {
  const matches = useMediaQuery('(min-width: 48em');
  const [trigger, { data, error, isFetching }]
  = useLazyGetOrderInfoQuery();
  useEffect(() => {
    if (!data && modalProps.opened) trigger({ number: orderNumber, issued: orderIssued });
  }, [modalProps.opened]);
  const issuedLabel = data?.issued ? moment(data.issued).format('DD.MM.YYYY'): '';
  return (
    <OrderDetailedContext.Provider value={{      
      IsLoading: isFetching,
      error: error as any,
      order: data,
      issuedLabel,
    }}>
      {
      matches ?
        <DesktopModal
          onRetry={() => trigger({ number: orderNumber, issued: orderIssued })}
          {...modalProps}
        />
      :
        <MobileOrderModal 
          onRetry={() => trigger({ number: orderNumber, issued: orderIssued })}
          {...modalProps} 
        />
      }
    </OrderDetailedContext.Provider>
  );
};

export default OrderDetailedInfoCard;
