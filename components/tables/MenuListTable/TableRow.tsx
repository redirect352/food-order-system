import { Table } from "@mantine/core";
import { MenuListItem } from "../../../shared/types/menu/menu-list.dto";
import moment from "moment";
import { useCallback, useState } from "react";
import React from "react";
import MenuInfoModal from "@/components/cards/MenuInfoCard";

interface TableRowProps {
  item: MenuListItem,
}

const TableRow = ({ item }: TableRowProps) => {
  const {id, name, relevantFrom, expire, menuPositionsCount, author, providingCanteen, created} = item;
  const formatDate = useCallback((date: Date) => moment(date).format('YYYY-MM-DD HH:mm'),[]);
  const [opened, setOpened] = useState(false);
  return (
    <React.Fragment>
        <Table.Tr onClick={()=>setOpened(true)}>
          <Table.Td>{id}</Table.Td>
          <Table.Td>{name}</Table.Td>
          <Table.Td>{formatDate(relevantFrom)}</Table.Td>
          <Table.Td>{formatDate(expire)}</Table.Td>
          <Table.Td>{menuPositionsCount}</Table.Td>
          <Table.Td>{providingCanteen.name}</Table.Td>
          <Table.Td>
            {`${author.surname} ${author.name.charAt(0).toUpperCase()}. ${author.patronymic.charAt(0).toUpperCase()}.`}
          </Table.Td>
          <Table.Td>{formatDate(created)}</Table.Td>
        </Table.Tr> 
        <MenuInfoModal 
          opened={opened} 
          onClose={()=>setOpened(false)} 
          menuId={id} 
          formatDate={formatDate}
        />
      </React.Fragment>    
  );
};

export default TableRow;