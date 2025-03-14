'use client';

import { Group, Modal, ModalProps, Stack, Title, Text, Button, Badge } from '@mantine/core';
import React, { FunctionComponent } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { MobileModal, PFCLabel } from '@/UI';
import MobileModalBody from './MobileModalContent';
import { MenuPositionDto } from '@/shared/types';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import CartItemCommentInput from '@/components/inputs/CartItemCommentInput';
import classes from './styles.module.scss';

interface ItemExtraInfoCartProps extends ModalProps {
  menuPosition: MenuPositionDto,
  buttonText: string | React.ReactNode,
  buttonAction: (onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined) => void,
  cartOptionsEnabled?: boolean,
  comment?: string,
}

const ItemExtraInfoCard: FunctionComponent<ItemExtraInfoCartProps> =
  ({ menuPosition, buttonAction, buttonText, cartOptionsEnabled, comment,...modalProps }) => {
  const matches = useMediaQuery('(min-width: 48em');
  const {
    description, name, quantity, calorieContent, images,
    externalProducer, providingCanteen, category,
    proteins, carbohydrates, fats } = menuPosition.dish;
  const producerName = externalProducer ?? providingCanteen.name;
  const clickAction = () => { modalProps.onClose(); buttonAction(); };
  return (
    <>
      {matches ?
      <Modal.Root {...modalProps} size="auto" centered>
      <Modal.Overlay />
      <Modal.Content>
          <Modal.Body className={classes.modalBody}>
            <Group gap="lg" wrap="nowrap" align="center">
              <ImageCarousel 
                images={images} 
                classNames={{slide: classes.imageBox}}
                sizes='(max-width:62em) 300px 300px, (min-width:62em) 400px 400px,'
              />
              <Stack className={classes.descriptionBox} gap={0} justify="space-between" maw="100%">
                <Stack gap={0} maw="100%">
                  <Group w="100%" justify="space-between" align="flex-start" mb="xs">
                    <Group w="80%" justify="space-between" gap={4}>
                      <Title order={2} lineClamp={3}>{name}</Title>
                      {category && <Badge size="sm">{category?.name}</Badge>}
                    </Group>
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
                  { cartOptionsEnabled && 
                    <CartItemCommentInput menuPositionId={menuPosition.id} /> 
                  }
                </Stack>
                <Stack>
                  <PFCLabel
                    proteins={proteins}
                    fats={fats}
                    carbohydrates={carbohydrates}
                  />
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
                        calorieContent ?? '-'
                        }
                      </Text>
                  </Group>
                  { comment &&
                  <Group justify="space-between">
                      <Text size="sm"> Комментарий:</Text>
                      <Text size="sm"> {comment}</Text>
                  </Group>
                  }
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
        title={menuPosition.dish.name}
        showAccept
        acceptAction={clickAction}
        buttonText={buttonText}
        {...modalProps}
      >
        <MobileModalBody menuPosition={menuPosition} cartOptionsEnabled={cartOptionsEnabled} />
      </MobileModal>}
    </>
  );
};

export default ItemExtraInfoCard;
