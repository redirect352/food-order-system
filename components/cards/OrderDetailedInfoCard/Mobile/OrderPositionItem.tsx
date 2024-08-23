import { FunctionComponent } from 'react';
import { Grid, NumberFormatter, Title } from '@mantine/core';
import { ScalingCard } from '@/UI';
import { OrderPositionFullInfoDto } from '@/shared/types';
import { PriceHelper } from '@/shared/helpers';

interface OrderPositionItemProps {
  position: OrderPositionFullInfoDto
  onClick?: ()=>void,
}

const OrderPositionItem: FunctionComponent<OrderPositionItemProps> = ({ position, onClick }) => {
  const { count, menuPosition } = position;
  const { dish, price, discount } = menuPosition;
  const { name } = dish;
  return (
    <ScalingCard bg="var(--mantine-color-background)" mt={3} onClick={onClick}>
      <Grid w="100%">
        <Grid.Col span={9}>
          <Title order={5} fw={500} lineClamp={1}>{name}</Title>
        </Grid.Col>
        <Grid.Col span={3} ta="right">
          {count} шт.
        </Grid.Col>
        <Grid.Col span={9} fs="italic" fz="sm">Стоимость / ед.</Grid.Col>
        <Grid.Col span={3} fz="sm" ta="right">
          <NumberFormatter
            value={PriceHelper.getPriceWithDiscount(price / 100, discount, count)}
            decimalScale={2}
            suffix=" руб."
          />
        </Grid.Col>
        <Grid.Col span={9} fs="italic" fz="sm">Итого</Grid.Col>
        <Grid.Col span={3} fz="sm" ta="right">
          <NumberFormatter
            value={PriceHelper.getPriceWithDiscount(price / 100, discount, count)}
            decimalScale={2}
            suffix=" руб."
          />
        </Grid.Col>
      </Grid>
    </ScalingCard>
  );
};

export default OrderPositionItem;
