import { MenuListItem } from "@/shared/types/menu/menu-list.dto";
import { Table } from "@mantine/core";
import moment from "moment";
import classes from './styles.module.scss';

interface MenuListTableProps {
  items: MenuListItem[];
}

const MenuListTable = ({items}: MenuListTableProps) => {
  const formatDate = (date: Date) => moment(date).format('YYYY-MM-DD HH:mm');
  const rows = items.map(({id, name, relevantFrom, expire, menuPositionsCount, author, providingCanteen, created}) => (
    <Table.Tr key={id}>
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
  ));
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
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    );
};

export default MenuListTable;