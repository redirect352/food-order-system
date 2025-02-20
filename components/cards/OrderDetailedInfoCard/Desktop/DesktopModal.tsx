'use client';

import { Badge, Button, Flex, Grid, GridCol, LoadingOverlay, Modal, ModalProps, NumberFormatter } from '@mantine/core';
import { FunctionComponent, useContext } from 'react';
import moment from 'moment';
import classes from './styles.module.scss';
import { OrderDetailedContext } from '../context/OrderDetailedContext';
import OrderPositionsTable from './OrderPositionsTable/OrderPositionsTable';
import { ErrorPage } from '@/UI';
import { useCancelOrder } from '@/shared/hooks';
import { orderStatusColor } from '@/shared/settings';

interface DesktopModalProps extends ModalProps {
  onRetry?: ()=>void,
}

const DesktopModal: FunctionComponent<DesktopModalProps> = ({
  onRetry,
  ...modalProps
}) => {
  const { order, error, IsLoading, issuedLabel } = useContext(OrderDetailedContext);
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
            Заказ № {order?.number} от {issuedLabel}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <Grid gutter="xl">
              <GridCol span={4} className={classes.gridCaption}>
                Сумма заказа
              </GridCol>
              <GridCol span={8} className={classes.importantInfo}>
                <NumberFormatter value={(order?.fullPrice ?? 0) / 100} decimalScale={2} suffix=" руб." />
              </GridCol>
              <GridCol span={4} className={classes.gridCaption}>
                Место доставки
              </GridCol>
              <GridCol span={8} className={classes.importantInfo}>
                {order?.deliveryDestination.name ?? '-'}
              </GridCol>
              <GridCol span={4} className={classes.gridCaption}>
                Статус заказа
              </GridCol>
              <GridCol span={8} className={classes.statusContainer}>
                <Badge color={orderStatusColor(order?.status)} size="lg">
                  {order?.status}
                </Badge>
              </GridCol>
              <GridCol span={4} className={classes.gridCaption}>
                Изменен
              </GridCol>
              <GridCol span={8}>
                { moment(order?.updated).format('HH:mm, DD.MM.YYYY') }
              </GridCol>
              <GridCol span={4} className={classes.gridCaption}>
                Создан
              </GridCol>
              <GridCol span={8}>
                { moment(order?.created).format('HH:mm, DD.MM.YYYY') }
              </GridCol>
              <GridCol
                span={12}
                className={classes.gridSubheading}>
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
            className={classes.cancelButton}
            variant="outline" 
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
