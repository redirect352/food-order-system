'use client';

import { OfficeFullInfoDto } from "@/shared/types";
import { ActionIcon, Button, Checkbox, Table, Text, TextInput } from "@mantine/core";
import SampleTable from "../SampleTable";
import { formatDate } from "@/shared/helpers/formatHelper";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";
import classes from './styles.module.scss';
import { useDeleteBranchOfficeMutation, useUpdateBranchOfficeMutation } from "@/lib/api/adminApi";
import { ModalService, NotificationService } from "@/shared/services";
import { useDisclosure } from "@mantine/hooks";
import CreateBranchOfficeModal from "../../modals/CreateBranchOfficeModal";
import { typesLabels } from "@/shared/types/branch-office/office-types";

interface BranchesTableProps {
  items: OfficeFullInfoDto[]
}

const BranchesTable = ({items}: BranchesTableProps) => {
  const THead = () =>{
      return(
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Название</Table.Th>
          <Table.Th>Адрес</Table.Th>
          <Table.Th>Тип</Table.Th>
          <Table.Th>Доступен</Table.Th>
          <Table.Th>Столовая</Table.Th>
          <Table.Th>Изменен</Table.Th>
          <Table.Th>Создан</Table.Th>
          <Table.Th></Table.Th>
          <Table.Th></Table.Th>

        </Table.Tr>
      )
    }
  return (
    <SampleTable
      headerContent={<THead />}
      items={items}
      makeRow={(item)=>(<TableRow item={item} key={item.id} />)}
      className=""
      extraRows={<AddRowButton />}
    />
  );
};
const TableRow = ({item}:{item: OfficeFullInfoDto}) => {
  const { id, name, address, officeType,changed, created, isAvailable, servingCanteen } = item;
  console.log(isAvailable)
  const form = useForm({
    mode: 'uncontrolled',
    initialValues:{
      name,
      address,
      isAvailable,
    },
    validate:{
      name: (val) => val.length >=5 ? null : 'Минимальная длина 5 символов',
      address: (val) => val.length >=5 ? null : 'Минимальная длина 5 символов',
    }
  });
  const [triggerUpdate, updateResult] = useUpdateBranchOfficeMutation();
  const [triggerDelete, deleteResult] = useDeleteBranchOfficeMutation();
  const updateOffice = ()=>{
    if(form.validate().hasErrors) return;
    const values = form.getValues();
    console.log(values);
    triggerUpdate({
      officeId: id,
      ...values,
    }).then((res)=>{
      if(res.data){
        NotificationService.showSuccessNotification({message:'Данные филиала успешно изменены'})
        form.resetDirty();
      }else{
        NotificationService.showErrorNotification({message:'При изменении данных филиала произошла ошибка ' + (res.error)})
      }
    })
  }
  const deleteClicked = () => {
    ModalService.openDeleteModal(
      {
        children: (
          <Text size="sm">
            Вы точно хотите удалить указанный элемент? Удаление филиала будет невозможно, в случае если на него содержатся ссылки других элементов базы данных. В общем случае возможно удалить только недавно созданный филиал.
          </Text>
        ),
        onConfirm:()=>{
          triggerDelete(id).then(res =>{
            if(res.data){
              NotificationService.showSuccessNotification({message:'Филиал удален'})
            }else{
              NotificationService.showErrorNotification({message:'Удаление филиала невозможно ' + (res.error)})
            }
          })
        }
      }
    );
  };
  return (
    <Table.Tr>
      <Table.Td>{id}</Table.Td>
      <Table.Td>
        <TextInput
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
      </Table.Td>
      <Table.Td>
        <TextInput
          key={form.key('address')}
          {...form.getInputProps('address')}
        />
      </Table.Td>
      <Table.Td>{typesLabels[officeType]}</Table.Td>
      <Table.Td>
        <Checkbox
          key={form.key('isAvailable')}
          {...form.getInputProps('isAvailable')}
          defaultChecked={isAvailable}
        />
      </Table.Td>
      <Table.Td>{ servingCanteen ? servingCanteen.name:'-' }</Table.Td>
      <Table.Td>{ formatDate(changed) }</Table.Td>
      <Table.Td>{ formatDate(created) }</Table.Td> 
      <Table.Td>
        <ActionIcon 
          className={classes.saveBtn}
          size={24} 
          variant='transparent' 
          disabled={!form.isDirty()}
          onClick={updateOffice}
        >
          <IconDeviceFloppy size={24}/>
        </ActionIcon>
      </Table.Td>
      <Table.Td>{ 
        <ActionIcon 
          size={24} 
          variant='transparent' 
          onClick={deleteClicked}
        >
          <IconTrash size={24}/>
        </ActionIcon> }
      </Table.Td> 
    </Table.Tr> 
  );
};

const AddRowButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return(
    <Table.Tr>
      <Table.Td colSpan={10}>
        <Button 
          variant="transparent"
          fullWidth
          leftSection={<IconPlus />}
          onClick={open}
        >
          Создать филиал
        </Button>
        <CreateBranchOfficeModal
          opened={opened}
          onClose={close}
        />
      </Table.Td>
      
    </Table.Tr>
  )
};

export default BranchesTable;