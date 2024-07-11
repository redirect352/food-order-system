
import { Button, Card, Grid, List, NumberFormatter, Text, CardSection, GridCol, ListItem } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import { ScalingCard } from '@/UI';

interface OrderCardProps {
  orderId: number;
}

const OrderCard: FunctionComponent<OrderCardProps> = () => {
  const total = 333.33412;
  const statusText = 'Принят';
  const statusColor = 'gray.2';//cyan.2 lime.2 green.2 green.4
  return (
    <ScalingCard shadow="xl" className={classes.orderCardWrapper}>
      <CardSection bg="var(--mantine-color-background)" p="md">
        <Text fw={500} fz="h3">
          <Text span fs="italic" fz="h3">Заказ №</Text>{' '}
          xxx{' '}
          <Text span fs="italic" fz="h3">от</Text>{' '}
          10.07.2024
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
          <GridCol span={8} bg={statusColor}>
            {statusText}
          </GridCol>
          <GridCol span={4} fs="italic">
            Состав заказа
          </GridCol>
          <GridCol span={8}>
            <List>
              <ListItem>Борщ холодный</ListItem>
              <ListItem>Шашлык из филе птицы со сладким перцем,</ListItem>
              <ListItem>Хлеб</ListItem>
              <ListItem>Сметана</ListItem>
              <ListItem>Перец</ListItem>
            </List>

          </GridCol>
        </Grid>
      </CardSection>
      <CardSection>
        <Button w="100%" variant="transparent" bg="var(--mantine-color-background)" bd={0} className={classes.bottomAboutButton}>
        </Button>
      </CardSection>
    </ScalingCard>
  );
};

export default OrderCard;
