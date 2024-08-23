import { Notifications } from '@mantine/notifications';

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Notifications />
      {children}
    </>
  );
}
