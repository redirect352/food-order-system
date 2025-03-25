import { Box, Group, Skeleton, Title } from "@mantine/core";
import { useLazyGetMenuListQuery } from "@/lib/api/moderatorApi";
import MenuListTable from "@/components/tables/MenuListTable";
import { ErrorPage, Pagination, Select } from "@/UI";
import { useForm } from "@mantine/form";
import OfficeSelect from "@/components/OfficeSelect/OfficeSelect";
import classes from './styles.module.scss';
import { useEffect } from "react";
import { IconSpider } from "@tabler/icons-react";
import { useSearchParamValue } from "@/shared/hooks";

interface MenuListFormProps {
  
}

const MenuListForm = (props: MenuListFormProps) => {
  const [fetch, result] = useLazyGetMenuListQuery();
  const {data, error, isLoading} = result;
  const pageFromUrl = useSearchParamValue<number>('page');
  const form = useForm({
      mode:'controlled',
      initialValues: {
        deliveryDestinationId: '',
        pageSize: '20'
      },
      validate:{
        deliveryDestinationId: (val) => !val ? 'Выберите место доставки' : null,
      },
  });
  useEffect(()=>{
    const {deliveryDestinationId, pageSize} = form.getValues();
    if(!deliveryDestinationId) return;
    fetch({
      page: pageFromUrl ?? 1, 
      pageSize: +pageSize, 
      destinationOfficeId: +deliveryDestinationId
    });
  },[form.getValues(), pageFromUrl]);
  return (
    <div className={classes.formBox}>
      <Group className={classes.selectGroup}>
        <OfficeSelect 
          label='Выберите целевой филиал'
          inputProps={form.getInputProps('deliveryDestinationId')}  
          inputKey={form.key('deliveryDestinationId')} 
          className={classes.select}
        />
        <Select 
          label='Количество элементов в таблице'
          data={['5','10','15','20']} 
          key={form.key('pageSize')} 
          {...form.getInputProps('pageSize')}
          className={classes.select}
        />
      </Group>
      {isLoading && <Skeleton mih={400} miw={1000}/>}
      {data && <MenuListTable items={data.menuList} />}
      {error && <ErrorPage message={(error as any).message}/>}
      {
        !form.getValues().deliveryDestinationId &&
        <Box className={classes.emptyContent}>
          <IconSpider size={160} stroke={1} />
          <Title>Филиал не выбран</Title>
        </Box>
      }
      { data &&
        <Group className={classes.paginationBox}>
          <Pagination total={data?.totalPages} />
        </Group>
      }
    </div>
  );
};

export default MenuListForm;