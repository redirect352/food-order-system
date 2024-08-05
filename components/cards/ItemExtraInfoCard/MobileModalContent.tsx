import { Box, Grid, Stack, Text, Title } from '@mantine/core';
import { FunctionComponent } from 'react';
import classes from './styles.module.scss';
import { ImageWithFallback } from '@/UI';
import { Dish } from '@/shared/types';

interface MobileModalBodyProps {
  dish: Dish
}

const MobileModalBody: FunctionComponent<MobileModalBodyProps> = ({ dish }) => {
  const { name, description, calorieContent, producerName, quantity, image } = dish;
  return (
    <Stack className={classes.mobileModalBody} align="center" px="sm" gap="xs">
      <Box className={classes.image}>
        <ImageWithFallback
          src={image}
          sizes="97vw"
          alt=""
          fill
          style={{ borderRadius: '8px' }}
        />
      </Box>
      <Stack gap={0} w="100%" align="flex-start">
        <Title order={2} ta="left" w="100%">
          {name}
        </Title>
        <Text c="dimmed" size="xs">{quantity}</Text>
        <Grid gutter={10} align="flex-start" mt="xs">
          <Grid.Col span={6}>
            <Text size="sm">Состав</Text>
          </Grid.Col>
          <Grid.Col span={6}>
          <Text size="sm"> {description}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm">Калорийность</Text>
          </Grid.Col>
          <Grid.Col span={6}>
          <Text size="sm">
            {
              typeof calorieContent === 'number' ?
              `${calorieContent} ккал/100гр`
              :
              calorieContent
            }
          </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm">Производитель</Text>
          </Grid.Col>
          <Grid.Col span={6}>
          <Text size="sm"> {producerName}</Text>
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
};
export default MobileModalBody;
