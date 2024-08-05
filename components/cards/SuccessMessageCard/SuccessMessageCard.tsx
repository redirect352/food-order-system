'use client';

import { Button, Paper, PaperProps, Stack, ThemeIcon, Title, Text, TextProps, TitleProps, ButtonProps } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SuccessMessageCardProps extends PaperProps {
}

function SuccessMessageCard({ children, ...props }:
  React.PropsWithChildren<SuccessMessageCardProps>) {
  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      {...props}
    >
      <Stack align="center" ta="center" gap={0}>
        {children}
      </Stack>
    </Paper>
  );
}

SuccessMessageCard.Icon =
function SuccessMessageCardIcon(
  { children, size } : React.PropsWithChildren<{ size: number }>) {
  return (
    <ThemeIcon variant="transparent" size={size}>
      { children }
    </ThemeIcon>
  );
};

SuccessMessageCard.Title =
function SuccessMessageCardTitle({ children, ...props } : React.PropsWithChildren<TitleProps>) {
  return (
    <Title order={2} pb="md" {...props}>
      {children}
    </Title>
  );
};
SuccessMessageCard.Text =
function SuccessMessageCardText(props : React.PropsWithChildren<TextProps>) {
  return (
    <Text fw={400} fz={16} maw={400} pb="md" {...props}>
      {props.children}
    </Text>
  );
};

SuccessMessageCard.OkButton =
function SuccessMessageCardOkButton(
  {
    children,
    redirectLink,
    ...props
  } : React.PropsWithChildren<{ redirectLink : string } & ButtonProps>) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push(redirectLink)}
      {...props}
    >
      {children}
    </Button>
  );
};

export { SuccessMessageCard };
