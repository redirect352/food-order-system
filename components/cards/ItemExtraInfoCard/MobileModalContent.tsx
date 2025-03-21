import { FunctionComponent } from 'react';
import { Badge, Box, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { ImageWithFallback, PFCLabel } from '@/UI';
import { MenuPositionDto } from '@/shared/types';
import { ImageHelper } from '@/shared/helpers';
import classes from './styles.module.scss';
import CartItemCommentInput from '../../inputs/CartItemCommentInput';

interface MobileModalBodyProps {
  menuPosition: MenuPositionDto,
  cartOptionsEnabled?: boolean
}

const MobileModalBody: FunctionComponent<MobileModalBodyProps> = ({ menuPosition, cartOptionsEnabled }) => {
  const { dish } = menuPosition;
  const { name, description, calorieContent, quantity, images,
    providingCanteen, externalProducer, proteins, carbohydrates, fats } = dish;
  const producerName = externalProducer ?? providingCanteen.name;
  const mainImage = images?.at(0);
  return (
    <Stack className={classes.mobileModalBody} align="center" px="sm" gap="xs">
      <Box className={classes.image}>
        <ImageWithFallback
          src={ImageHelper.getImageSrc(mainImage)}
          sizes="97vw"
          alt={mainImage?.name ?? ''}
          fill
          style={{ borderRadius: '8px' }}
        />
      </Box>
      <Stack gap={0} w="100%" align="flex-start">
        <Group w="100%" justify="space-between" gap={2} mb="xs">
          <Title order={2} ta="left" lineClamp={3}>
            {name}
          </Title>
          <Badge>{dish?.category?.name}</Badge>
        </Group>
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
              calorieContent ?? '-'
            }
          </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm">Производитель</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm"> {producerName}</Text>
          </Grid.Col>
          { cartOptionsEnabled &&
            <Grid.Col span={12}>
              <CartItemCommentInput menuPositionId={menuPosition.id} /> 
            </Grid.Col>
          }
          <Grid.Col span={6}>
            <Text size="sm"></Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <PFCLabel
              proteins={proteins}
              carbohydrates={carbohydrates}
              fats={fats}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
};
export default MobileModalBody;
