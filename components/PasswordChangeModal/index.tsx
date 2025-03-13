import { Button, Flex, LoadingOverlay, Modal, ModalProps, TextInput } from "@mantine/core";
import classes from './styles.module.scss';
import { PasswordStrength } from "@/UI";
import { useForm } from "@mantine/form";
import { passwordStrength } from "check-password-strength";
import { useUpdateUserPasswordMutation } from "../../lib/api/adminApi";
import { NotificationService } from "../../shared/services";
import PasswordGenerator from "../PasswordGenerator";
import { EmployeeInfoDto } from "../../shared/types/employee/employee-info.dto";

interface PasswordChangeModalProps extends ModalProps {
  userId: number,
  employee?: EmployeeInfoDto,
}

const PasswordChangeModal = ({employee, userId, ...modalProps}: PasswordChangeModalProps) => {
  const [updatePass, updateResult] = useUpdateUserPasswordMutation();
  const form =  useForm({
    mode:'controlled',
    initialValues:{
      newPassword: '',
      passwordRepeat: '',
    },
    validate:{
      newPassword: (val) => (passwordStrength(val).id < 2 ?
            ' ' : null),
      passwordRepeat: (val, { newPassword }) => (val !== newPassword ? 'Пароли не совпадают' : null),
    }
  });
  const onClose = ()=>{
    form.reset(); 
    modalProps.onClose()
  };
  const onSubmit = () => {
    if(form.validate().hasErrors) return;
    updatePass({id: userId, body: form.getValues()})
    .then(({data, error}) => {
      if(data){
        onClose();
        NotificationService.showSuccessNotification({message:'Пароль пользователя успешно изменен'});
      }
      if(error){
        NotificationService.showErrorNotification({message:(error as any)?.message ??'При изменении пароля произошла ошибка'})
      }
    })
  };
  return (
    <Modal.Root {...modalProps} onClose={onClose} size="auto" centered>
      <Modal.Overlay />
      <Modal.Content className={classes.modalContent}>
        <Modal.Header className={classes.header}>
          <Modal.Title className={classes.modalTitle}>
            Изменения пароля пользователя {employee?.surname} {employee?.personnelNumber}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <LoadingOverlay visible={updateResult.isLoading}/>
          <PasswordStrength
            checkValue={form.getValues().newPassword}
            label="Новый пароль"
            placeholder="********"
            type="password"
            defaultVisible={true}
            {...form.getInputProps('newPassword')}
          />
          <TextInput
            label="Повторите пароль"
            placeholder="********"
            type="password"
            {...form.getInputProps('passwordRepeat')}
          />
          <PasswordGenerator />
          <Flex justify="space-between">
            <Button 
              className={classes.cancelButton}
              variant="outline" 
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button 
              className={classes.cancelButton}
              variant="filled"
              onClick={onSubmit}
            >
              Сохранить изменения
            </Button>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default PasswordChangeModal;