import { Modal, ModalProps } from '@mantine/core';
import { FunctionComponent } from 'react';
import { ImageWithFallback } from '@/UI';

interface ItemExtraInfoCartProps extends ModalProps {

}

const ItemExtraInfoCart: FunctionComponent<ItemExtraInfoCartProps> = ({ ...modalProps }) => {
  const l = 123;
  return (
    <Modal {...modalProps} centered>
      <ImageWithFallback src="" alt="123" width={100} height={100} />
    </Modal>
  );
};

export default ItemExtraInfoCart;
