'use client';

import { Button, Modal, ModalProps } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';

interface MobileModalProps extends React.PropsWithChildren<ModalProps> {
  acceptAction?: () => void,
  showAccept?: boolean
  cancelAction?: () => void,
}

const MobileModal: FunctionComponent<MobileModalProps> = ({
  acceptAction = () => {},
  cancelAction = () => {},
  children,
  showAccept = false,
...modalProps
}) => (
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
        <Modal.Title fw="bold">{modalProps.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body px={0} flex="1 1 auto">
        {children}
      </Modal.Body>
      {
      showAccept &&
      <Button
        className={classes.submitModalButton}
        onClick={() => { modalProps.onClose(); acceptAction(); }}
      >
        Применить
      </Button>
      }
    </Modal.Content>
    </Modal.Root>
  );

export default MobileModal;