'use client';

import { Button, Grid, List, NumberFormatter, Text, CardSection, GridCol, ListItem, Badge } from '@mantine/core';
import { FunctionComponent, useEffect } from 'react';
import moment from 'moment';
import { useDisclosure } from '@mantine/hooks';
import classes from './styles.module.scss';
import { ScalingCard } from '@/UI';
import { OrderMainInfoDto } from '@/shared/types';
import OrderDetailedInfoCard from '../OrderDetailedInfoCard/OrderDetailedInfoCard';
import { useCancelOrderMutation } from '@/lib/api/orderApi';
import { ModalService, NotificationService } from '@/shared/services';
import { error } from 'console';
import { useCancelOrder } from '@/shared/hooks';
import { orderStatusColor } from '@/shared/settings';

interface OrderCardProps {
  orderMainInfoDto: OrderMainInfoDto,
}

const OrderCard: FunctionComponent<OrderCardProps> = ({ orderMainInfoDto }) => {
  const { number, fullPrice, status, issued, orderPositions,canCancel } = orderMainInfoDto;
  const total = fullPrice / 100;
  const statusText = status;
  const [opened, { open, close }] = useDisclosure(false);
  const {cancelOrder} = useCancelOrder(number, issued);
  const cancelButtonClick = (e:any) =>{
    e.stopPropagation();
    cancelOrder();
  }
  return (
    <>
      <ScalingCard
        shadow="xl"
        className={classes.orderCardWrapper}
        onClick={open}
      >
        <CardSection bg="var(--mantine-color-background)" p="md">
          <Text fw={500} fz="h3">
            <Text span fs="italic" fz="h3">Заказ №</Text>{' '}
            {number}{' '}
            <Text span fs="italic" fz="h3">от</Text>{' '}
            {moment(issued).format('DD.MM.YYYY')}
          </Text>
        </CardSection>
        <CardSection p="md">
          <Grid>
            <GridCol span={4} fs="italic">
              Сумма заказа
            </GridCol>
            <GridCol span={8}>
              <NumberFormatter value={total} decimalScale={2} suffix=" руб." />
            </GridCol>
            <GridCol span={4} fs="italic">
              Статус заказа
            </GridCol>
            <GridCol span={8} bg="gray.2">
              <Badge color={orderStatusColor(statusText)} size="lg">
                {statusText}
              </Badge>
            </GridCol>
            <GridCol span={4} fs="italic">
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
        <CardSection>
          <Button
            w="100%"
            variant="transparent"
            bg="var(--mantine-color-background)"
            bd={0}
            className={classes.bottomAboutButton}
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
