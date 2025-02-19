'use client';

import { useDisclosure } from '@mantine/hooks';
import classes from './styles.module.scss';
import { Stack, Title } from '@mantine/core';
import DestinationInputModal from './DestinationInputModal';
import { useAppSelector } from '../../shared/hooks';
import { selectDeliveryDestination } from '../../lib/features/cart/cartSlice';
import { useEffect, useState } from 'react';

interface DeliveryDestinationInputProps {
  
}

const DeliveryDestinationInput = (props: DeliveryDestinationInputProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(()=>setIsClient(true),[])
  const destination = useAppSelector(selectDeliveryDestination);
  const [opened, { open, close }] = useDisclosure(destination===null);
  const destinationLabel  = destination ? 
    <Stack className={classes.destinationNameBox}>
      <strong>{destination.name}</strong>
      <span className={classes.addressLabel}>{destination.address}</span>
    </Stack> 
  : 
    <strong>{'<Не установлено>'}</strong>;
  return (
    <>
      <DestinationInputModal  opened={opened} onClose={close} centered />
      <div className={classes.labelBox} onClick={open}>
        <Title order={4}>Место доставки:</Title> 
        {isClient && destinationLabel}
      </div>
    </>
  );
};

export default DeliveryDestinationInput;