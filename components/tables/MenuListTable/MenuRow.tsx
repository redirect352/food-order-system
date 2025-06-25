'use client';

import { Table, Text } from "@mantine/core";
import { MenuListItem } from "@/shared/types";
import {  useState } from "react";
import React from "react";
import MenuInfoModal from "@/components/cards/MenuInfoCard";
import { formatDate } from "@/shared/helpers/formatHelper";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import classes from './styles.module.scss';
import ControlCols from "../SampleTable/ControlCols";
import { useDeleteMenuMutation, useUpdateMenuMutation } from "@/lib/api/moderatorApi";
import { ModalService, NotificationService } from "@/shared/services";

const TableRow = (item: MenuListItem) => {
  const {id, name, relevantFrom, expire, menuPositionsCount, author, providingCanteen, created} = item;
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues:{
      relevantFrom: new Date(relevantFrom),
      expire: new Date(expire)
    }
  });
  const [updateMenu, result] = useUpdateMenuMutation();
  const [deleteMenu, deleteResult] = useDeleteMenuMutation();
  const stopPropagation = (e: any) => e.stopPropagation();
  const onUpdate=  (e: any) => {
    e.stopPropagation();
    updateMenu({
      id, 
      body: {
        ...form.getValues()
      }
    })
    .then(() => {
      NotificationService.showSuccessNotification({
        title: `Данные меню ${id} успешно изменены изменены!`,
        message: ''
      })
      form.resetDirty();
    })
    .catch((err)=>{
      NotificationService.showErrorNotification({
        title: 'Ошибка обновления данных меню!',
        message: err?.message
      })
    })
  }
  const onDelete=  (e: any) =>{
    e.stopPropagation();
    ModalService.openDeleteModal(
      {
        children: (
          <Text size="sm">
            Вы точно хотите удалить указанный элемент? Удаление меню приведет к <strong>полной потере данных</strong> меню.
          </Text>
        ),
        onConfirm:()=>{
          deleteMenu({id})
          .then(res =>{
            if(res.data){
              NotificationService.showSuccessNotification({message:`Меню с ${id} удален`})
            }else{
              NotificationService.showErrorNotification({message:'Удаление меню невозможно ' + ((res.error as any).message)})
            }
          })
        }
      }
    );
  }
  return (
    <React.Fragment>
      <Table.Tr onClick={()=>setOpened(true)} w={'100%'}>
        <Table.Td>{id}</Table.Td>
        <Table.Td>{name}</Table.Td>
        <Table.Td>
          <DateTimePicker
            valueFormat="DD MMMM YYYY HH:mm"
            wrapperProps={{
              onClick: stopPropagation
            }}
            {...form.getInputProps('relevantFrom')}
            key={form.key('relevantFrom')}
            className={classes['date-input']}
            data-dirty={form.getDirty().relevantFrom ? 'true' : null}
          />
        </Table.Td>
        <Table.Td>{
          <DateTimePicker
            valueFormat="DD MMMM YYYY HH:mm"
            wrapperProps={{
              onClick: stopPropagation
            }}
            {...form.getInputProps('expire')}
            key={form.key('expire')}
            className={classes['date-input']}
            data-dirty={form.getDirty().expire ? 'true' : null}
          />
        }</Table.Td>
        <Table.Td>{menuPositionsCount}</Table.Td>
        <Table.Td>{providingCanteen.name}</Table.Td>
        <Table.Td>
          {`${author.surname} ${author.name.charAt(0).toUpperCase()}. ${author.patronymic.charAt(0).toUpperCase()}.`}
        </Table.Td>
        <Table.Td>{formatDate(created)}</Table.Td>
        <ControlCols
          onUpdate={onUpdate}
          onDelete={onDelete}
          disabled={{
            update: !form.isDirty()
          }}
        />
      </Table.Tr>
      <MenuInfoModal 
        opened={opened} 
        onClose={()=>setOpened(false)} 
        menuId={id} 
      />
    </React.Fragment>    
  );
};

export default TableRow;