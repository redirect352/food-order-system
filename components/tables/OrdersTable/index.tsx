'use client';

import { Table } from "@mantine/core";
import React, { useState } from "react";
import SampleTable from "../SampleTable";
import { SearchOrderItemDto } from "@/lib/api/moderatorApi/types";
import OrdersTableRow from "./OrdersTableRow";
import { OrderDetailedInfoCard } from "@/components";
import { useDisclosure } from "@mantine/hooks";

interface MenuListTableProps {
  items: SearchOrderItemDto[];
}

const OrdersListTable = ({items}: MenuListTableProps) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [orderData, setOrderData] = useState<[number, string]>([0, '']);
  const THead = () =>{
    return(
      <Table.Tr>
        <Table.Th>ID</Table.Th>
        <Table.Th>Номер заказа</Table.Th>
        <Table.Th>Сотрудник</Table.Th>
        <Table.Th>Сумма заказа,<br/> руб.</Table.Th>
        <Table.Th>Кол-во позиций,<br/> шт.</Table.Th>
        <Table.Th>Статус</Table.Th>
        <Table.Th>Место доставки</Table.Th>
        <Table.Th>Изменено</Table.Th>
        <Table.Th>Создано</Table.Th>
      </Table.Tr>
    )
  }
  return (
    <>
      <SampleTable
        headerContent={<THead />}
        items={items}
        makeRow={(item)=><OrdersTableRow key={item.id} item={item} onClick={() => {
          setOrderData([item.number, item.issued]);
          open();
        }}/>}
      />
      <OrderDetailedInfoCard
        opened={opened}
        onClose={() => { close();}}
        orderNumber={orderData[0]}
        orderIssued={orderData[1]}
      />
    </>
  );
};

export default OrdersListTable;