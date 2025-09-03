import { Button, Menu, MenuProps, Text } from "@mantine/core";
import classes from './styles.module.scss';
import { IconEdit, IconTrash, IconSelectAll, IconDeselect } from "@tabler/icons-react";
import { ModalService } from "@/shared/services";
import React from "react";
interface DropdownMenuProps extends MenuProps{
  actions: {
    selectAll: () => void,
    deselectAll: () => void,
    edit:  () => void,
    deleteItems: () => void,
    deleteTags: () => void,
  }
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const {actions} = props;
  return (
      <Menu 
        {...props}
      >
        <Menu.Target>
          <Button className={classes.menuPosButton}>Open</Button> 
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item 
            leftSection={<IconEdit size={14} />}
            onClick={actions.edit}  
          >
            Редактировать
          </Menu.Item>
          <Menu.Item
            leftSection={<IconSelectAll size={14} />}
            onClick={actions.selectAll}
          >
            Выбрать все
          </Menu.Item>
                    <Menu.Item
            leftSection={<IconDeselect size={14} />}
            onClick={actions.deselectAll}
          >
            Отменить выделение
          </Menu.Item>
          {/* <Menu.Item
            leftSection={<IconCopy size={14} />}
          >
            Создать копии
          </Menu.Item> */}
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={14} />}
            onClick={
              () => openConfirmModal({
                onConfirm: actions.deleteTags,
                title: 'Подтвердите действие',
                children: <>Это действие приведет к удалению всех тегов выбранных изображений.<br/>
                Желаете продолжить?</>,
              })
            }
          >
            Очистить теги
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={14} />}
            onClick={
              () => openConfirmModal({onConfirm:actions.deleteItems})
            }
          >
            Удалить
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
  );
};

export default DropdownMenu;

function openConfirmModal (props: {
  onConfirm: () =>void, 
  onCancel?: () =>void
  title?:React.ReactNode,
  children?: React.ReactNode,
}){
  const {onConfirm, onCancel, title, children} = props;
   ModalService.openConfirmModal({
    title: title ?? 'Вы точно хотите удалить выбранные изображения?',
    children: children ?? (
      <Text size="sm">
        Изображения будут удалены навсегда
      </Text>
    ),
    labels: { cancel: 'Назад', confirm: 'Удалить' },
    onConfirm,
    onCancel,
  });
}