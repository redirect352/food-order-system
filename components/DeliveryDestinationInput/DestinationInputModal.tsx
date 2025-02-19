'use client';

import classes from './styles.module.scss';
import { Button, ComboboxData, ComboboxItem, Flex, Group, Modal, ModalProps, Skeleton, Stack, Title } from "@mantine/core";
import { ErrorPage, Select } from "../../UI";
import { useForm } from "@mantine/form";
import { useGetDeliveryPointsQuery } from "@/lib/api/menuApi";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { OfficeDto } from "../../shared/types";
import { changeDeliveryDestination, selectDeliveryDestination } from "../../lib/features/cart/cartSlice";

interface DestinationInputModalProps extends ModalProps {
  
}

const DestinationInputModal = (props: DestinationInputModalProps) => {
  const query = useGetDeliveryPointsQuery(undefined);
  const {data, error, isSuccess, isFetching, refetch} = query;
  const [options, setOptions] = useState<ComboboxData>([]);
  const destination = useAppSelector(selectDeliveryDestination);
  const form = useForm({
    initialValues:{
      destination: `${destination?.id}`
    },
    validate:{
      destination: val => val === '' ? 'Выберите место доставки':null,
    }
  });
  const dispatch = useAppDispatch();
  const setDeliveryDestination = (office: OfficeDto | null) =>  dispatch(changeDeliveryDestination(office));
  useEffect(()=>{
    if(!data || !isSuccess)  return;
    setOptions(
      data.map(({name, id, address})=>({value: id.toString(), label: `${name} (${address}))` }))
    );
    if( destination && data.findIndex((item) => +item.id === +destination.id ) === -1){
      setDeliveryDestination(null);
      form.setFieldValue('destination', '');
    }
  },[data]);
  const onClose = () =>{
    const res = form.validate();
    if(res.hasErrors) return;
    const office = data?.find((val) => val.id === +form.getValues().destination)
    if(office) setDeliveryDestination(office);
    props.onClose();
  };
  if(error){
    return(
      <Modal 
        withCloseButton={false} 
        {...props}
      >
        <ErrorPage message={(error as any)?.message ?? 'Невозможно получить места доставки'} onRetry={refetch}/>
      </Modal>
    )
  }
  return (
    <Modal 
      withCloseButton={false} 
      {...props}
      onClose={onClose}
    >
      <Stack gap={'md'} >
        <Title order={3}>Выберите место доставки</Title>
        { isFetching && <Skeleton className={classes.skeleton} /> }
        {
          isSuccess && !isFetching && 
          <Select data={options} {...form.getInputProps('destination')}/> 
        }
        <Group justify='flex-end'>
          <Button onClick={onClose}>Принять</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
export default DestinationInputModal;