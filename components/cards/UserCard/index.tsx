import { CardSection, ActionIcon, Grid, Radio, Group, Button, CheckIcon, Text, Card, Tooltip, TextInput, LoadingOverlay } from "@mantine/core";
import { IconDeviceFloppy, IconKey, IconX } from "@tabler/icons-react";
import { ErrorPage, Select } from "@/UI";
import classes from './styles.module.scss';
import React, { useEffect } from "react";
import { rolesSelectOptions } from "@/shared/settings";
import { useForm } from "@mantine/form";
import { useGetUserMainInfoQuery } from "@/lib/api/adminApi";
import { formatDate, formatFullName, formatOffice } from "@/shared/helpers/formatHelper";
import { UserMainInfoDto, UserOwnInfoDto } from "../../../shared/types/user";
import moment from "moment";

interface UserCardProps {
  userId: number
}

const UserCard = ({userId}: UserCardProps) => {
  const { isFetching, error, data, refetch } = useGetUserMainInfoQuery(userId);
  return (
    <Card className={classes.card}  withBorder >
      <LoadingOverlay visible={isFetching} />
      <CardSection className={classes.headerSection} withBorder>
          <Text className={classes.importantText}>
            {formatFullName(data?.employee)}, {data?.employee.personnelNumber}
          </Text>
          <Text className={classes.dimmedText}>
            {formatOffice(data?.office)}
          </Text>
          <Tooltip label="Изменить пароль">
            <ActionIcon
              className={classes.resetPasswordButton}
              variant='transparent'
              size={32}
            >
              <IconKey size={32}/>
            </ActionIcon>
          </Tooltip>
      </CardSection>
      {error && 
        <ErrorPage 
          message={(error as any)?.message ?? `Ошибка загрузки пользователя с id ${userId} `}
          onRetry={refetch}
        />
      }
      {data && <EditUserForm {...data} />}
    </Card>
  );
};

const EditUserForm = (data:UserMainInfoDto)=>{
  const { email, id, login, registered, changed, role, emailConfirmed, activeEmployee } = data;
  const form = useForm({
    mode: 'uncontrolled',
        initialValues: {
          login,
          email,
          role,
          emailConfirmed: String(emailConfirmed),
          active: String(activeEmployee),
        },
        validate:  {
          login:(val) => val.length < 5 || val.includes('@') ?
          'Логин должен содержать не менее 5 символов и не должен содержать символ @' : null,
          email: val =>  /^\S+@\S+$/.test(val) ? null : 'Некорректный email',
          role: val => val ===''? 'Роль не установлена':  null
        },
  });
  const saveChanges = () => {
    const result = form.validate();
    if(result.hasErrors) return;
  };
  return(
    <>
      <CardSection className={classes.centralSection} withBorder>
          <Grid align='center'>
          <GridRow label="id">
              {id}
            </GridRow>
            <GridRow label="Логин">
              <TextInput 
                variant="unstyled"
                classNames={{input:classes.tableTextInput}}
                placeholder="web.master3000"
                key={form.key('login')}
                {...form.getInputProps('login')}
              />
            </GridRow>
            <GridRow label="Email">
              <TextInput 
                variant="unstyled"
                classNames={{input:classes.tableTextInput}}
                placeholder="admin.admin@minstrans.by"
                type="email"
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
            </GridRow>
            <GridRow label="Роль">
              <Select 
                allowDeselect={false}
                data={rolesSelectOptions}
                key={form.key('role')}
                {...form.getInputProps('role')}
              />
            </GridRow>
            <GridRow label="Дата изменения">
              {formatDate(changed, 'with-sec')}
            </GridRow>          
            <GridRow label="Дата регистрации">
              {formatDate(registered, 'with-sec')}
            </GridRow>
            <Grid.Col fs={'italic'} span={6}>
              <Radio.Group
                label="Статус подтверждения email: "
                key={form.key('emailConfirmed')}
                {...form.getInputProps('emailConfirmed')}
              >
                <Group mt="xs">
                  <Radio value={'true'} label="Подтвержден" />
                  <Radio value={'false'} label="Не подтвержден" />
                </Group>
              </Radio.Group>
            </Grid.Col>
            <Grid.Col fs={'italic'} span={6}>
              <Radio.Group
                label="Статус сотрудника: "
                key={form.key('active')}
                {...form.getInputProps('active')}
              >
                <Group mt="xs">
                  <Radio value={'true'} label="Работает на предприятии" />
                  <Radio value={'false'} label="Уволен" />
                </Group>
              </Radio.Group>
            </Grid.Col>
          </Grid>
        </CardSection>
        <CardSection>
          <Group justify="space-between" className={classes.buttonsGroup}>
            <Tooltip label="Данные не были изменены" disabled={form.isDirty()}>
              <Button 
                className={classes.saveBtn} 
                variant={'transparent'} 
                leftSection ={<IconDeviceFloppy size={24}/>}
                disabled={!form.isDirty()}
                onClick={saveChanges}
              >
                Сохранить изменения
              </Button>
            </Tooltip>
            <Button 
              className={classes.cancelBtn} 
              variant={'transparent'} 
              leftSection ={<IconX size={24}/>}
              disabled={!form.isDirty()}
              onClick={()=>form.reset()}
            > 
              Отмена
            </Button>
          </Group>
        </CardSection>
      </>
  )
}

const GridRow = ({label, children}:React.PropsWithChildren<{label: string}>)=>{
  return(
    <>
      <Grid.Col fs={'italic'} span={3}>
        {label}
      </Grid.Col>
      <Grid.Col span={9}>
        {children}
      </Grid.Col>
    </>
  )
}
export default UserCard;