import { Badge, Group, Text } from '@mantine/core';
import { FunctionComponent } from 'react';

interface PFCLabelProps {
  proteins?: number,
  fats?: number,
  carbohydrates?: number
}

const PFCLabel: FunctionComponent<PFCLabelProps> = ({ proteins, fats, carbohydrates }) => {
  if (!proteins && !fats && !carbohydrates) {
    return <></>;
  }
  return (
    <Group gap="xs">
      <Badge circle size="md" color="green.8">Б</Badge>
      <Text>{proteins ?? 0}</Text>
      <Badge circle size="md" color="red.8">Ж</Badge>
      <Text>{fats ?? 0}</Text>
      <Badge circle size="md" color="yellow.7">У</Badge>
      <Text>{carbohydrates ?? 0}</Text>
    </Group>
  );
};

export default PFCLabel;
