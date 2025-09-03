'use client';

import { Modal, ModalProps, Stack, Title, Text, Box, Divider } from '@mantine/core';
import React, { FunctionComponent, useRef } from 'react';
import { ImageWithFallback } from '@/UI';
import { ImageFullInfoDto } from '@/shared/types';
import { formatDate, ImageHelper } from '@/shared/helpers';
import { ModalService } from '@/shared/services';
import TagsEditForm from './TagsEditForm';
import classes from './styles.module.scss';

interface ImageEditCardProps extends ModalProps {
  imageData: ImageFullInfoDto,
}

const ImageEditCard: FunctionComponent<ImageEditCardProps> =
  ({ imageData, onClose, ...modalProps }) => {
  const { id, name, author, tags, uploaded } = imageData!;
  const src = ImageHelper.getImageSrc(imageData);
  const authorInfo = `${author?.employee?.surname} ${author?.employee?.name.at(0)}.${author?.employee?.patronymic.at(0)}.(${author?.employee.personnelNumber})`;
  const isDirtyRef  = useRef<any>(null);
  const onCloseRef  = useRef<any>(null);
  const closeAction = () => { 
    if(isDirtyRef.current && isDirtyRef.current()){
      ModalService.openConfirmModal({
        title: 'У вас есть несохраненный изменения, желаете продолжить?',
        children: null,
        onConfirm: () => onClose()
      })
    }else{
      if(onCloseRef.current) onCloseRef.current();
      onClose();  
    }
  };

  return (
    <Modal.Root 
      onClose={closeAction} 
      {...modalProps} 
      size="auto"
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body className={classes.modalBody}>
          <Modal.CloseButton  className={classes.closeButton} />
          <Box 
            className={classes.imageBox}
          >
            <ImageWithFallback
              className={classes.imageBox}
              src={src}
              alt={name ?? ''}
              sizes=" 400px 400px"
              fill
            />
          </Box>
          <Stack className={classes.descriptionBox}>
            <Title order={3}>{name} (id:{id})</Title>
            <Divider />
            <TagsEditForm  
              imageId={imageData.id}
              tags={tags} 
              dirtyRef={isDirtyRef} 
              onCloseRef={onCloseRef}
            />
            <Divider />
            <Text className={classes.dimmedText}> 
              Загружено: {authorInfo} в {formatDate(uploaded)}
            </Text>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ImageEditCard;
