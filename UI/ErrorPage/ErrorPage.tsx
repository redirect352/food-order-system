import { Stack, Title, Text, Button, ThemeIcon, StackProps } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { FunctionComponent } from 'react';

interface ErrorPageProps extends StackProps {
  title?: string,
  message?: string,
  buttonLabel?: string,
  onRetry?: () => void,
}

export const ErrorPage: FunctionComponent<ErrorPageProps> = ({
  title = 'Что-то пошло не так',
  message = 'При загрузке страницы страницы возникла ошибка. Нажмите чтобы попробовать снова',
  buttonLabel = 'Попробовать снова',
  onRetry,
  ...stackProps
}) => (
    <Stack p="md" align="center" {...stackProps}>
      <ThemeIcon size={100} variant="transparent">
        <IconExclamationCircle size={100} />
      </ThemeIcon>
      <Stack gap={3} align="center">
        <Title order={2}>{title}</Title>
        <Text fz="md" maw="70%" ta="center">{message}</Text>
      </Stack>
      <Button size="md" radius="xl" onClick={onRetry}>
        {buttonLabel}
      </Button>
    </Stack>
  );
