
import { OfficeFilter, OrdersSearchList, PeriodFilter, SortOrderFilterBar } from "@/components";
import classes from './styles.module.scss';
import { Flex, Group } from "@mantine/core";

interface OrdersProps {
  
}

const Orders = (props: OrdersProps) => {
 
  return (
    <div className={classes.container}>
      <SortOrderFilterBar sortFieldsOptionsDef={[
          {label:'id', 'value':'id'},
          {label:'Дата изменения', 'value':'changed'},
          {label:'Дата создания', 'value':'created'},
        ]}
      >
        <OfficeFilter 
          searchParam={"office"} 
          arrayValue={false} 
          officeType='office'
        />
      </SortOrderFilterBar>
      <Group justify='flex-end'>
        <PeriodFilter />
      </Group>
      <OrdersSearchList />
    </div>
  );
};

export default Orders;