import { Flex, Stack, StackProps } from '@mantine/core';
import { FunctionComponent } from 'react';
import { OrderMainInfoDto } from '@/shared/types';
import OrderCard from '../cards/OrderCard/OrderCard';
import { Pagination } from '@/UI';

interface OrderListProps extends StackProps {
  items?: OrderMainInfoDto[],
  totalPages?: number,
  isFetching?: boolean,
  pageSize: number,
}

export const OrderList: FunctionComponent<OrderListProps> = (props) => {
  const { items, totalPages = 1, isFetching = false, pageSize, ...stackProps } = props;
  const loadingContent = [...Array(pageSize)].map((item, index) =>
    (<OrderCard key={index} isLoading />));
  return (
    <Stack gap="xl" align="center" w="100%" {...stackProps}>
      {isFetching && loadingContent}
      {!isFetching && items &&
        items.map(item =>
          <OrderCard
            key={`${item.number}-${item.issued}`}
            orderMainInfoDto={item}
          />
      )}
      <Flex w="100%" justify="flex-end" align="flex-end" flex="1 1 auto">
        <Pagination
          total={totalPages}
          boundaries={0}
          gap={4}
          size="sm"
        />
      </Flex>
    </Stack>
  );
};
