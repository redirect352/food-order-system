'use client';

import { Box, Button, Group, Modal, ModalProps } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import React, { FunctionComponent } from 'react';
import classes from './styles.module.scss';

interface MobileModalProps extends React.PropsWithChildren<ModalProps> {
  acceptAction?: () => void,
  showAccept?: boolean
  cancelAction?: () => void,
  resetAction?: () => void,
  resetText?: string | React.ReactNode,
  buttonText?: string | React.ReactNode,
}

const MobileModal: FunctionComponent<MobileModalProps> = ({
  acceptAction = () => {},
  cancelAction = () => {},
  children,
  showAccept = false,
  buttonText = 'Применить',
  resetAction = () => {},
  resetText,
...modalProps
}) => {
  const resetVisible = !!resetText;
  return (
    <Modal.Root
      {...modalProps}
      fullScreen
  >
    <Modal.Content display="flex" style={{ flexDirection: 'column' }} w="100%">
      <Modal.Header>
        <Modal.CloseButton
          icon={<IconChevronLeft size={32} stroke={1.5} />}
          style={{ marginInlineStart: 0 }}
          onClick={() => { modalProps.onClose(); cancelAction(); }}
        />
        <Modal.Title fz="h3" fw="bold">{modalProps.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body px={0} flex="1 1 auto">
        {children}
      </Modal.Body>
      {
      showAccept &&
      <Box className={classes.submitModalButtonContainer}>
        <Group justify="space-around" px="md">
          { resetVisible &&
          <Button
            className={classes.submitModalButton}
            variant="outline"
            onClick={() => { modalProps.onClose(); resetAction(); }}
            fz="md"
            w="42vw"
          >
            Сбросить
          </Button>
          }
          <Button
            className={classes.submitModalButton}
            onClick={() => { modalProps.onClose(); acceptAction(); }}
            fz="lg"
            w={!resetVisible ? '80vw' : '42vw'}
          >
            {buttonText}
          </Button>
        </Group>
      </Box>
      }
    </Modal.Content>
    </Modal.Root>
  );
};

export default MobileModal;
