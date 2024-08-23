import { rem } from '@mantine/core';
import { NotificationData, NotificationsStore, showNotification } from '@mantine/notifications';
import { IconAlertTriangle, IconCheck, IconHandStop } from '@tabler/icons-react';
import React from 'react';

type ExtendedNotificationData = NotificationData & {
  message: string | string[] | React.ReactNode;
};
export class NotificationService {
  static showErrorNotification(notification: ExtendedNotificationData, store?: NotificationsStore) {
    return this.baseShowNotification({
      ...notification,
      icon: <IconAlertTriangle />,
    }, store);
  }

  static showForbiddenNotification(notification: NotificationData, store?: NotificationsStore) {
    return this.baseShowNotification({
      ...notification,
      icon: <IconHandStop />,
    }, store);
  }

  static showSuccessNotification(notification: NotificationData, store?: NotificationsStore) {
    return this.baseShowNotification({
      ...notification,
      icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
      color: 'green',
    }, store);
  }

  private static baseShowNotification(
    notification: ExtendedNotificationData,
    store?: NotificationsStore,
  ) {
    if (Array.isArray(notification.message)) {
      notification.message = (
        <>
          {notification.message.map(item => (<>{item}<br /></>))}
        </>
      );
    }
    showNotification({ ...notification }, store);
  }
}
