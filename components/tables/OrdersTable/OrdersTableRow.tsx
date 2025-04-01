import { NumberFormatter, Table } from "@mantine/core";
import { SearchOrderItemDto } from "@/lib/api/moderatorApi/types";
import { formatDate } from "@/shared/helpers/formatHelper";
import dayjs from "dayjs";

interface OrdersTableRowParams {
  item: SearchOrderItemDto,
  onClick? : ()=> void,
}

const OrdersTableRow = ({item, onClick}: OrdersTableRowParams) => {
  const {id, number, issued, created,clientName, canCancel, clientPersonnelNumber , updated, status, orderPositionsCount, fullPrice,deliveryDestination} = item;
  return (
    <Table.Tr onClick={onClick}>
      <Table.Td>{id}</Table.Td>
      <Table.Td>{number}-{dayjs(issued).format('DD.MM.YYYY')}</Table.Td>
      <Table.Td>{clientName}({clientPersonnelNumber})</Table.Td>
      <Table.Td>        
        <NumberFormatter value={fullPrice/100} decimalScale={2}/>
      </Table.Td>
      <Table.Td>{orderPositionsCount}</Table.Td>
      <Table.Td>{status}</Table.Td>
      <Table.Td>{deliveryDestination.name}</Table.Td>
      <Table.Td>{formatDate(updated)}</Table.Td>
      <Table.Td>{formatDate(created)}</Table.Td>
    </Table.Tr> 
  );
};

export default OrdersTableRow;