'use client';

import { Badge, Button, Flex, Grid, GridCol, LoadingOverlay, Modal, ModalProps, NumberFormatter } from '@mantine/core';
import { FunctionComponent, useContext } from 'react';
import moment from 'moment';
import classes from './styles.module.scss';
import { OrderDetailedContext } from '../context/OrderDetailedContext';
import OrderPositionsTable from './OrderPositionsTable/OrderPositionsTable';
import { ErrorPage } from '@/UI';
import { ModalService } from '@/shared/services';
import { useCancelOrder } from '@/shared/hooks';
import { orderStatusColor } from '@/shared/settings';

interface DesktopModalProps extends ModalProps {
  onRetry?: ()=>void,
}

const DesktopModal: FunctionComponent<DesktopModalProps> = ({
  onRetry,
  ...modalProps
}) => {
  const { order, error, IsLoading } = useContext(OrderDetailedContext);
  const {cancelOrder} = useCancelOrder(
    order?.number ?? -1,
    order?.issued ?? ""
  );
  return (
    <Modal.Root {...modalProps} size="auto" centered>
      <Modal.Overlay />
      <Modal.Content miw={500}>
        <LoadingOverlay
          visible={IsLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
        {
          error &&
          <ErrorPage
            message={Array.isArray(error.message) ? error.message.join(', ') : error.message}
            onRetry={onRetry}
          />
        }
        {
          (IsLoading || order) &&
        <>
        <Modal.Header bg="var(--mantine-color-background)">
          <Modal.Title fz="h3" fw={500}>
            Заказ № {order?.number} от {order?.issued}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={classes.modalBody} mt="md" mr="xs">
          <Grid gutter="xl">
              <GridCol span={4} fs="italic" fz="lg">
                Сумма заказа
              </GridCol>
              <GridCol span={8} fz="lg" fw={500}>
                <NumberFormatter value={(order?.fullPrice ?? 0) / 100} decimalScale={2} suffix=" руб." />
              </GridCol>
              <GridCol span={4} fs="italic" fz="lg">
                Статус заказа
              </GridCol>
              <GridCol span={8} bg="gray.2" fz="lg">
                <Badge color={orderStatusColor(order?.status)} size="lg">
                  {order?.status}
                </Badge>
              </GridCol>
              <GridCol span={4} fs="italic" fz="lg">
                Изменен
              </GridCol>
              <GridCol span={8} fz="lg">
                {moment(order?.updated).format('HH:mm, DD.MM.YYYY')}
              </GridCol>
              <GridCol span={4} fs="italic" fz="lg">
                Создан
              </GridCol>
              <GridCol span={8} fz="lg">
                {moment(order?.created).format('HH:mm, DD.MM.YYYY')}
              </GridCol>
              <GridCol
                span={12}
                fw={500}
                fz="lg"
                bg="var(--mantine-color-background)">
                Состав заказа:
              </GridCol>
          </Grid>
          <OrderPositionsTable
            orderPositions={order?.orderPositions}
            fullPrice={order?.fullPrice}
            mt="md"
          />
          <Flex justify="center" mt="lg">
          <Button 
            variant="outline" 
            w={500} 
            radius={300} 
            onClick={cancelOrder}
            disabled={!order?.canCancel}
          >
            Отменить заказ
          </Button>
          </Flex>
        </Modal.Body>
        </>
        }
      </Modal.Content>
    </Modal.Root>
  );
};

export default DesktopModal;
