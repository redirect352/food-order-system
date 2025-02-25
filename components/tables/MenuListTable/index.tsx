import { MenuListItem } from "@/shared/types/menu/menu-list.dto";
import { Table } from "@mantine/core";
import moment from "moment";
import classes from './styles.module.scss';
import MenuInfoModal from "../../cards/MenuInfoCard";
import { useState } from "react";
import React from "react";
import TableRow from "./TableRow";

interface MenuListTableProps {
  items: MenuListItem[];
}

const MenuListTable = ({items}: MenuListTableProps) => {
  return (
      <Table striped highlightOnHover withTableBorder withColumnBorders className={classes.table}> 
        <Table.Thead className={classes.header}>
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
        </Table.Thead>
        <Table.Tbody>
          { items.map((item)=><TableRow key={item.id} item={item}/>) }
        </Table.Tbody>
      </Table>
    );
};

export default MenuListTable;