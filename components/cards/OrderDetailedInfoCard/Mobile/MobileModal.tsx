import { Badge, Grid, Group, ModalProps, Stack, Title, Text, NumberFormatter, LoadingOverlay } from '@mantine/core';
import { FunctionComponent, useContext, useState } from 'react';
import moment from 'moment';
import { useDisclosure } from '@mantine/hooks';
import { ErrorPage, MobileModal } from '@/UI';
import { useCancelOrder } from '@/shared/hooks';
import { OrderDetailedContext } from '../context/OrderDetailedContext';
import { orderStatusColor } from '@/shared/settings';
import OrderPositionItem from './OrderPositionItem';
import ItemExtraInfoCard from '../../ItemExtraInfoCard/ItemCard';
import { MenuPositionDto } from '@/shared/types';
// import classes from './styles.module.scss';

interface MobileOrderModalProps extends ModalProps {
  onRetry?: ()=>void,
}

const MobileOrderModal: FunctionComponent<MobileOrderModalProps> = ({ onRetry, ...modalProps }) => {
  const { order, error, IsLoading } = useContext(OrderDetailedContext);
  const orderLabel = `Заказ № ${order?.number} от ${order?.issued}`;
  const { cancelOrder } = useCancelOrder(
    order?.number ?? -1,
    order?.issued ?? ''
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [currentPosition, setCurrentPosition] = useState<MenuPositionDto | null>(null);

  return (
    <MobileModal
      title="Информация о заказе"
      showAccept={order?.canCancel}
      acceptAction={cancelOrder}
      buttonText="Отменить заказ"
      {...modalProps}
    >
      {
          error &&
          <ErrorPage
            w="100%"
            mt="20dvh"
            message={Array.isArray(error.message) ? error.message.join(', ') : error.message}
            onRetry={onRetry}
          />
        }
      <Stack gap={0} w="100%" align="flex-start" px="md">
        <LoadingOverlay
          visible={IsLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
        {
          !error &&
          <>
          <Group w="100%" justify="space-between" gap={2} mb="xs">
            <Title order={2} ta="left" lineClamp={3}>
              {orderLabel}
            </Title>
            <Badge color={orderStatusColor(order?.status)}>
              {order?.status}
            </Badge>
          </Group>
          <Grid>
            <Grid.Col span={6}>
              <Text fs="italic" fz="lg">Сумма заказа</Text>
            </Grid.Col>
            <Grid.Col span={6} fz="lg" fw={500}>
              <NumberFormatter
                value={(order?.fullPrice ?? 0) / 100}
                decimalScale={2}
                suffix=" руб."
              />
            </Grid.Col>
            <Grid.Col span={6} fs="italic" fz="lg">Изменен</Grid.Col>
            <Grid.Col span={6} fz="lg">
              {moment(order?.updated).format('HH:mm, DD.MM.YYYY')}
            </Grid.Col>
            <Grid.Col span={6} fs="italic" fz="lg">Создан</Grid.Col>
            <Grid.Col span={6} fz="lg">
              {moment(order?.created).format('HH:mm, DD.MM.YYYY')}
            </Grid.Col>
            <Grid.Col
              span={12}
              fw={500}
              fz="lg"
              bg="var(--mantine-color-background)"
              py="lg"
            >
              Состав заказа:
            </Grid.Col>
            {
              order?.orderPositions.map(item =>
              <OrderPositionItem
                position={item}
                key={item.menuPosition.id}
                onClick={() => { setCurrentPosition(item.menuPosition); open(); }}
              />)
            }
          </Grid>
          </>
      }

      </Stack>
      {
        currentPosition &&
        <ItemExtraInfoCard
          opened={opened}
          onClose={() => { close(); }}
          buttonAction={close}
          title={currentPosition?.dish.name}
          menuPosition={currentPosition}
          buttonText="Закрыть"
        />
      }

    </MobileModal>
  );
};

export default MobileOrderModal;
