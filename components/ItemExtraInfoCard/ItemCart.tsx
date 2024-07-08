'use client';

import { Button, Modal, ModalProps } from '@mantine/core';
import { FunctionComponent, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ImageWithFallback } from '@/UI';

interface ItemExtraInfoCartProps {

}

const ItemExtraInfoCart: FunctionComponent<ItemExtraInfoCartProps> = () => {
  const l = 123;
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <>
      <Modal.Root opened={opened} onClose={close} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>Modal content</Modal.Body>
      </Modal.Content>
      </Modal.Root>
      <Button onClick={open} />
    </>
  );
};

export default ItemExtraInfoCart;
