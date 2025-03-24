import { MenuListItem } from "@/shared/types/menu/menu-list.dto";
import { Table } from "@mantine/core";
import React from "react";
import TableRow from "./MenuRow";
import SampleTable from "../SampleTable";

interface MenuListTableProps {
  items: MenuListItem[];
}

const MenuListTable = ({items}: MenuListTableProps) => {
  const THead = () =>{
    return(
      <Table.Tr>
        <Table.Th>ID</Table.Th>
        <Table.Th>Название</Table.Th>
        <Table.Th>Актуально с</Table.Th>
        <Table.Th>Актуально по</Table.Th>
        <Table.Th>Кол-во позиций</Table.Th>
        <Table.Th>Столовая</Table.Th>
        <Table.Th>Автор</Table.Th>
        <Table.Th>Добавлено</Table.Th>
      </Table.Tr>
    )
  }
  return (
    <SampleTable
      headerContent={<THead />}
      items={items}
      makeRow={(item)=><TableRow key={item.id} {...item}/>}
    />
  );
};

export default MenuListTable;