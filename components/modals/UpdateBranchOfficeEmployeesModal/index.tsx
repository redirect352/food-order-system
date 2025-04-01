'use client';

import { Button, FileInput, Group, LoadingOverlay, Modal, ModalProps, Stack } from "@mantine/core";
import { OfficeSelect } from "@/components";
import { useForm } from "@mantine/form";
import { useUpdateBranchOfficeEmployeesMutation } from "@/lib/api/adminApi";
import path from "path";
import commonClasses from '../styles.module.scss';
import { IconFile } from "@tabler/icons-react";
import { NotificationService } from "@/shared/services";


interface UpdateBranchOfficeEmployeesModalProps extends ModalProps {
  
}

const UpdateBranchOfficeEmployeesModal = ({...modalProps}: UpdateBranchOfficeEmployeesModalProps) => {
  const form = useForm({
    initialValues:{
      officeId: undefined as undefined | number,
      file: undefined as File | null | undefined,
    },
    validate:{
      file: (val) => {
        if(!val) return 'Файл не добавлен';
        if(path.extname(val.name) !== '.txt') return 'Некорректный формат файла. Выберите документ word (.txt)';
        return null;
      },
      officeId: (val) => !!val? null : 'Выберите филиал',
    }
  });
  const [triggerUpdate, updateResult] = useUpdateBranchOfficeEmployeesMutation();
  const onClose = () => {
    form.reset();
    modalProps.onClose();
  }
  const onSubmit = () => {
    if(form.validate().hasErrors) return;
    const values = form.getValues();
    triggerUpdate({
      officeId: values.officeId ?? -1,
      file: values.file!
    })
    .then(({data, error})=>{
      if(data){
        NotificationService.showSuccessNotification({
          title: 'Список пользователей филиала обновлен.',
          message: <>
            Добавлено пользователей: {data?.created}.<br />
            Пользователей активировано: {data?.active} <br />
            Пользователей уволено: {data?.inactive}
          </>,
          autoClose: 10000,
        })
        onClose();
      }else{
        NotificationService.showErrorNotification({message: 'При обновлении списка сотрудников произошла ошибка ' + (error as any)?.message })
      }
    })
  }
  return (
    <Modal.Root 
      {...modalProps} 
      size="auto" 
      centered
      onClose={onClose}
    >
      <Modal.Overlay />
      <Modal.Content miw={500}>
      <Modal.Header className={commonClasses.modalHeader}>
          <Modal.Title className={commonClasses.modalTitle}>
            Добавление нового сотрудника
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay visible={updateResult.isLoading} />
          <Stack>
            <OfficeSelect
              label={'Выберите филиал'}
              key={form.key('officeId')}
              {...form.getInputProps('officeId')}
              officeType='all'
              unselectable="off"
            />
            <FileInput
              label="Добавьте файл меню"
              placeholder={`sample.txt`}
              withAsterisk
              leftSection={<IconFile />}
              accept=".txt"
              key={form.key('file')}
              {...form.getInputProps('file')}
            />
            <Group justify="space-between">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button onClick={onSubmit}>Создать</Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default UpdateBranchOfficeEmployeesModal;