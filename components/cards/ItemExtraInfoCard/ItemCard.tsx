'use client';

import { Box, Group, Modal, ModalProps, Stack, Title, Text, Button } from '@mantine/core';
import React, { FunctionComponent } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { ImageWithFallback, MobileModal } from '@/UI';
import classes from './styles.module.scss';
import MobileModalBody from './MobileModalContent';
import { useAppSelector } from '@/shared/hooks';
import { selectMenuItem } from '@/lib/features/menu/menuSlice';

interface ItemExtraInfoCartProps extends ModalProps {
  dishId: number,
  buttonText: string | React.ReactNode,
  buttonAction: (onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined) => void,
}

const ItemExtraInfoCard: FunctionComponent<ItemExtraInfoCartProps> =
  ({ dishId, buttonAction, buttonText, ...modalProps }) => {
  const matches = useMediaQuery('(min-width: 48em');
  const dish = useAppSelector(state => selectMenuItem(state, dishId))!;
  const { description, name, quantity, producerName, calorieContent } = dish;
  const clickAction = () => { modalProps.onClose(); buttonAction(); };
  return (
    <>
      {matches ?
      <Modal.Root {...modalProps} size="auto" centered>
      <Modal.Overlay />
      <Modal.Content>
          <Modal.Body className={classes.modalBody}>
            <Group gap="lg" wrap="nowrap" align="center">
              <Box className={classes.imageBox}>
                <ImageWithFallback
                  src={dish.image}
                  alt={name}
                  sizes="(max-width:62em) 300px 300px, (min-width:62em) 400px 400px,"
                  priority={false}
                  fill
                  style={{ borderRadius: '36px' }}
                />
              </Box>
              <Stack className={classes.descriptionBox} gap={0} justify="space-between" maw="100%">
                <Stack gap={0} maw="100%">
                  <Group w="100%" justify="space-between">
                    <Title w="80%" order={2} lineClamp={3}>{name}</Title>
                    <Modal.CloseButton />
                  </Group>
                  <Stack gap={0} w={350}>
                    <Text c="dimmed" fz="sm" mb="xs">
                      {quantity}
                    </Text>
                    <Text mb="sm">
                      {description}
                    </Text>
                  </Stack>
                </Stack>
                <Stack>
                  <Group justify="space-between">
                      <Text size="sm"> Производитель:</Text>
                      <Text size="sm"> {producerName}</Text>
                  </Group>
                  <Group justify="space-between">
                      <Text size="sm"> Калорийность:</Text>
                      <Text size="sm">
                        {
                        typeof calorieContent === 'number' ?
                        `${calorieContent} ккал/100гр`
                        :
                        calorieContent
                        }
                      </Text>
                  </Group>
                  <Button onClick={clickAction}>
                    {buttonText}
                  </Button>
                </Stack>
              </Stack>
            </Group>
          </Modal.Body>
      </Modal.Content>
      </Modal.Root>
      :
      <MobileModal
        title={dish.name}
        showAccept
        acceptAction={clickAction}
        buttonText={buttonText}
        {...modalProps}
      >
        <MobileModalBody dish={dish} />
      </MobileModal>}
    </>
  );
};

export default ItemExtraInfoCard;
