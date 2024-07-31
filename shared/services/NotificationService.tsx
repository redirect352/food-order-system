import { NotificationData, NotificationsStore, showNotification } from '@mantine/notifications';
import { IconAlertTriangle, IconHandStop } from '@tabler/icons-react';

export class NotificationService {
  static showErrorNotification(notification: NotificationData, store?: NotificationsStore) {
    return showNotification({
      ...notification,
      icon: <IconAlertTriangle />,
    }, store);
  }

  static showForbiddenNotification(notification: NotificationData, store?: NotificationsStore) {
    return showNotification({
      ...notification,
      icon: <IconHandStop />,
    }, store);
  }
}
