import { Text } from '@mantine/core';
import { useCancelOrderMutation } from '@/lib/api/orderApi';
import { ModalService, NotificationService } from '../services';

export function useCancelOrder(number: number, issued: string) {
  const [cancel, result] = useCancelOrderMutation();
  const cancelOrderAccept = () => {
    cancel({ issued, number })
    .then((res) => {
      const { error, data } = res;
      if (error) { NotificationService.showErrorNotification({ message: (error as any)?.message }); }
      if (data === null || data) NotificationService.showSuccessNotification({ message: `Заказ ${number}-${issued} успешно отменен` });
    });
  };
  const cancelOrder = () => {
    ModalService.openDeleteModal({
      title: 'Вы точно хотите отменить заказ?',
      children: (
        <Text size="sm">
          После отмены заказа его будет невозможно вернуть
        </Text>
      ),
      labels: { cancel: 'Назад', confirm: 'Отменить заказ' },
      onConfirm: () => { cancelOrderAccept(); },
      onCancel: () => NotificationService.showSuccessNotification({ message: 'Действие остановлено' }),
    });
  };
  return { cancelOrder, result };
}
