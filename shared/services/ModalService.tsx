import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { OpenConfirmModal } from '@mantine/modals/lib/context';

export class ModalService {
  static openConfirmModal(payload?: OpenConfirmModal) {
    modals.openConfirmModal({
      title: 'Подтвердите действие на странице',
      children: (
        <Text size="sm">
          Для продолжения подтвердите выбранное действие на странице
        </Text>
      ),
      labels: { confirm: 'Подтвердить', cancel: 'Отменить' },
      ...payload,
    });
  }
  static openDeleteModal(payload?: OpenConfirmModal) {
    modals.openConfirmModal({
      title: 'Подтвердите удаление',
      centered: true,
      children: (
        <Text size="sm">
          Вы точно хотите удалить указанный элемент?
        </Text>
      ),
      'aria-modal': true,
      labels: { confirm: 'Продолжить', cancel: 'Отменить удаление' },
      confirmProps: { variant: 'transparent' },
      cancelProps: { variant: 'outline' },
      ...payload,
    });
  }
}
