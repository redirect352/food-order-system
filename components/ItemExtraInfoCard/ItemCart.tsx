'use client';

import { Box, Group, Modal, ModalProps, Stack, Title, Text, Button, NumberFormatter } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { ImageWithFallback, MobileModal } from '@/UI';
import classes from './styles.module.scss';
import img from '@/testData/foodImage.jpg';
import MobileModalBody from './MobileModalContent';
import { Dish } from '@/shared/types';

interface ItemExtraInfoCartProps extends ModalProps {
  dish: Dish
}

const ItemExtraInfoCart: FunctionComponent<ItemExtraInfoCartProps> =
  ({ dish, ...modalProps }) => {
  const matches = useMediaQuery('(min-width: 48em');
  const { price, discount, description, name, quantity, producerName, calorieContent } = dish;
  const finalPrice = (price * (100 - discount)) / 100;
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
                  src={img}
                  alt={name}
                  fill
                  style={{ borderRadius: '36px' }}
                />
              </Box>
              <Stack className={classes.descriptionBox} gap={0} justify="space-between">
                <Stack gap={0}>
                  <Group w="100%" justify="space-between">
                    <Title order={2}>{name}</Title>
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
                  <Button onClick={modalProps.onClose}>
                    <span>В корзину за&nbsp;</span>
                    <NumberFormatter
                      value={finalPrice}
                      decimalScale={2}
                      suffix=" рубля"
                    />
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
        buttonText={`В корзину за ${finalPrice.toFixed(2)} рубля`}
        {...modalProps}
      >
        <MobileModalBody dish={dish} />
      </MobileModal>}
    </>
  );
};

export default ItemExtraInfoCart;
