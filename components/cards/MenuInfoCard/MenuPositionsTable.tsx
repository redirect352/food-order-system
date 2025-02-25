import { Table, TableProps } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { MenuPositionDto } from '@/shared/types';
import { PriceHelper } from '@/shared/helpers';
import { ItemExtraInfoCard } from '@/components';

interface MenuPositionsTableProps extends TableProps {
  positions: MenuPositionDto[] | undefined,
}

const MenuPositionsTable: FunctionComponent<MenuPositionsTableProps> = ({
  positions,
  ...tableProps
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentPosition, setCurrentPosition] = useState<MenuPositionDto | null>(null);
  return (
    <>
      <Table
        withRowBorders
        highlightOnHover
        verticalSpacing="md"
        {...tableProps}
        styles={{
          tfoot: {
            borderTop: 'calc(0.0625rem * var(--mantine-scale)) solid var(--table-border-color)',
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Наименование</Table.Th>
            <Table.Th>Тип</Table.Th>
            <Table.Th>Стоимость, руб./шт.</Table.Th>
            <Table.Th>Скидка, %</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
          positions?.map((menuPosition, index) =>
              <Table.Tr
                key={menuPosition.id}
                onClick={() => { setCurrentPosition(menuPosition); open(); }}
                >
                <Table.Td>{menuPosition.id}</Table.Td>
                <Table.Td>{menuPosition.dish.name}</Table.Td>
                <Table.Td>{menuPosition.dish.category?.name ?? '-'}</Table.Td>
                <Table.Td>
                  {
                    PriceHelper.getPriceWithDiscount(
                      menuPosition.price / 100,
                      menuPosition.discount,
                      1
                    )
                  }
                </Table.Td>
                <Table.Td>{menuPosition.discount ?? '-'}</Table.Td>
              </Table.Tr>
        )}
        </Table.Tbody>
        <Table.Caption>Для просмотра карточки блюда нажмите на него</Table.Caption>
      </Table>
      {
        currentPosition &&
        <ItemExtraInfoCard
          opened={opened}
          onClose={() => { close(); }}
          buttonAction={close}
          title={currentPosition?.dish.name}
          menuPosition={currentPosition}
          buttonText="Закрыть"
        />
      }
    </>
  );
};

export default MenuPositionsTable;
