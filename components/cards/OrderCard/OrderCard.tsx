'use client';

import { Button, Grid, List, NumberFormatter, Text, CardSection, GridCol, ListItem, Badge, Skeleton } from '@mantine/core';
import { FunctionComponent } from 'react';
import moment from 'moment';
import { useDisclosure } from '@mantine/hooks';
import classes from './styles.module.scss';
import { ScalingCard } from '@/UI';
import { OrderMainInfoDto } from '@/shared/types';
import OrderDetailedInfoCard from '../OrderDetailedInfoCard/OrderDetailedInfoCard';
import { useCancelOrder } from '@/shared/hooks';
import { orderStatusColor } from '@/shared/settings';

interface OrderCardProps {
  orderMainInfoDto?: OrderMainInfoDto,
  isLoading?: boolean,
}
interface OrderCardContentProps {
  orderMainInfoDto: OrderMainInfoDto,
}

const OrderCard: FunctionComponent<OrderCardProps> = ({
  orderMainInfoDto,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Skeleton className={classes.orderCardWrapper} data-skeleton/>
    );
  }
  if (orderMainInfoDto) {
    return (
      <OrderCardContent orderMainInfoDto={orderMainInfoDto} />
    );
  }
  return <></>;
};

const OrderCardContent: FunctionComponent<OrderCardContentProps> = ({
  orderMainInfoDto,
}) => {
  const { number, fullPrice, status, issued, orderPositions, canCancel,deliveryDestination } = orderMainInfoDto;
  const { name, address } = deliveryDestination;
  const total = fullPrice / 100;
  const statusText = status;
  const [opened, { open, close }] = useDisclosure(false);
  const { cancelOrder } = useCancelOrder(number, issued);
  const cancelButtonClick = (e:any) => {
    e.stopPropagation();
    cancelOrder();
  };
  return (
    <>
      <ScalingCard
        className={classes.orderCardWrapper}
        onClick={open}
      >
        <CardSection className={classes.headerSection}>
          <Text className={classes.headerText}>
            <Text span className={classes.italicText}>Заказ №</Text>{' '}
            {number}{' '}
            <Text span className={classes.italicText}>от</Text>{' '}
            {moment(issued).format('DD.MM.YYYY')}
          </Text>
        </CardSection>
        <CardSection className={classes.bodySection}>
          <Grid>
            <GridCol span={4} className={classes.caption}>
              Сумма заказа
            </GridCol>
            <GridCol span={8} className={classes.informationLabel}>
              <NumberFormatter value={total} decimalScale={2} suffix=" руб." />
            </GridCol>
            <GridCol span={4} className={classes.caption}>
              Место доставки
            </GridCol>
            <GridCol span={8} className={classes.informationLabel}>
              {deliveryDestination.name}
            </GridCol>
            <GridCol span={4} className={classes.caption}>
              Статус заказа
            </GridCol>
            <GridCol span={8} className={classes.statusContainer}>
              <Badge color={orderStatusColor(statusText)} size="lg">
                {statusText}
              </Badge>
            </GridCol>
            <GridCol span={4} className={classes.caption}>
              Состав заказа
            </GridCol>
            <GridCol span={8}>
              <List>
                {
                orderPositions.map((pos, index) => {
                  if (index < 5) {
                    return (
                      <ListItem key={index}>
                        <Text lineClamp={1}>
                          {pos.name}
                        </Text>
                      </ListItem>
                    );
                  }
                  return null;
                })
                }
                {
                  orderPositions.length > 5 &&
                  <ListItem>
                    <Text c="dimmed" fz="sm">
                      Еще {orderPositions.length - 5 }...
                    </Text>
                  </ListItem>
                }
              </List>
            </GridCol>
          </Grid>
        </CardSection>
        <CardSection className={classes.bottomSection}>
          <Button
            variant='transparent'
            className={classes.aboutButton}
            onClick={cancelButtonClick}
            disabled={!canCancel}
          >
            Отменить заказ
          </Button>
        </CardSection>
      </ScalingCard>
      <OrderDetailedInfoCard
        opened={opened}
        onClose={() => { close(); }}
        orderNumber={number}
        orderIssued={issued}
      />
    </>
  );
};

export default OrderCard;
