import { Table, TableProps } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { MenuPositionDto, OrderPositionFullInfoDto } from '@/shared/types';
import { PriceHelper } from '@/shared/helpers';
import { ItemExtraInfoCard } from '@/components';

interface OrderPositionsTableProps extends TableProps {
  orderPositions: OrderPositionFullInfoDto[] | undefined,
  fullPrice? : number,
}

const OrderPositionsTable: FunctionComponent<OrderPositionsTableProps> = ({
  orderPositions,
  fullPrice,
  ...tableProps
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentPosition, setCurrentPosition] = useState<MenuPositionDto | null>(null);
  const tfooter = (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>Итого:</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th>{orderPositions?.reduce((sum, item) => sum + item.count, 0)}</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th>
        {(fullPrice ?? 0) / 100}
      </Table.Th>
    </Table.Tr>
  );
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
            <Table.Th>№</Table.Th>
            <Table.Th>Наименование</Table.Th>
            <Table.Th>Тип</Table.Th>
            <Table.Th>Количество</Table.Th>
            <Table.Th>Стоимость, руб./шт.</Table.Th>
            <Table.Th>Сумма</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
          orderPositions?.map(({ count, menuPosition }, index) =>
              <Table.Tr
                key={menuPosition.id}
                onClick={() => { setCurrentPosition(menuPosition); open(); }}
                >
                <Table.Td>{index+1}</Table.Td>
                <Table.Td>{menuPosition.dish.name}</Table.Td>
                <Table.Td>{menuPosition.dish.category?.name ?? '-'}</Table.Td>
                <Table.Td>{count}</Table.Td>
                <Table.Td>
                  {
                    PriceHelper.getPriceWithDiscount(
                      menuPosition.price / 100,
                      menuPosition.discount,
                      1
                    )
                  }
                </Table.Td>
                <Table.Td>
                  {
                  PriceHelper.getPriceWithDiscount(
                    menuPosition.price / 100,
                    menuPosition.discount,
                    count
                  )
                  }
                </Table.Td>
              </Table.Tr>
        )}
        </Table.Tbody>
        <Table.Tfoot>
          {tfooter}
        </Table.Tfoot>
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
          comment={orderPositions?.find(({menuPosition}) => menuPosition.id === currentPosition.id)?.comment}
        />
      }
    </>
  );
};

export default OrderPositionsTable;
