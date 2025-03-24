import { Table } from "@mantine/core";
import React from "react";
import SampleTable from "../SampleTable";
import { EmployeeFullInfoDto } from "@/shared/types/employee/employee-full-info.dto";
import { formatDate, formatFullName } from "@/shared/helpers/formatHelper";

interface EmployeesTableProps {
  items: EmployeeFullInfoDto[];
}

const EmployeesTable = ({items}: EmployeesTableProps) => {
  const THead = () =>{
    return(
      <Table.Tr>
        <Table.Th>ID</Table.Th>
        <Table.Th>ФИО</Table.Th>
        <Table.Th>Табельный номер</Table.Th>
        <Table.Th>Статус</Table.Th>
        <Table.Th>Филиал</Table.Th>
        <Table.Th>Изменен</Table.Th>
        <Table.Th>Создан</Table.Th>
      </Table.Tr>
    )
  }
  return (
    <SampleTable
      headerContent={<THead />}
      items={items}
      makeRow={(item)=>(<TableRow item={item} key={item.id} />)}
      className=""
    />
  );
};

export default EmployeesTable;

const TableRow = ({item}:{item: EmployeeFullInfoDto}) => {
  const {id, personnelNumber, active ,office} = item;
  return (
    <Table.Tr>
      <Table.Td>{id}</Table.Td>
      <Table.Td>{formatFullName(item)}</Table.Td>
      <Table.Td>{personnelNumber}</Table.Td>
      <Table.Td>{active? 'Работает' : 'Уволен'}</Table.Td>
      <Table.Td>{office.name}</Table.Td>
      <Table.Td>{formatDate(new Date())}</Table.Td>
      <Table.Td>{formatDate(new Date())}</Table.Td>
    </Table.Tr> 
  );
};
