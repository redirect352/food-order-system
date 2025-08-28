import { Container, Title, Text, Affix, Box, Stack, Group } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import MainPageButton from '../components/MainPageButton';
import classes from './styles.module.scss';
import { IconBowl, IconClick, IconDeviceMobile, IconShoppingBag, IconShoppingCart, IconSoup, IconTruck } from '@tabler/icons-react';


export default async function HomePage() {
  return (
    <Box className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'red.9', to: 'yellow.9', deg: 180 }}
              >
                Система заказа питания
              </Text>
              <br />
              Минсктранс
            </Title>

            <Stack className={classes.advantagesBlock}>
              <Group className={classes.advantage}>
                <IconSoup size={32}/>
                Вкусные блюда
              </Group>
              <Group className={classes.advantage}>
                <IconClick size={32}/>
                Удобный заказ
              </Group>
              <Group className={classes.advantage}>
                <IconTruck size={32}/>
                Доставка на рабочее место
              </Group>
            </Stack>
            {/* <Text className={classes.description} mt={30}>
              Выбирайте блюда и полуфабрикаты из меню обслуживающей столовой ГП «Минсктранс», заказывайте доставку,{' '}
              отслеживайте статус доставки и получайте заказы с помощью системы заказа питания.
            </Text> */}
            <MainPageButton className={classes.control} />
            <Text className={classes.menuButtonLabel}>Соберите заказ за пару минут</Text>
            <Affix position={{ top: 0, left: 20 }} visibleFrom="sm">
              <ColorSchemeToggle />
            </Affix>
          </div>
        </div>
      </Container>
    </Box>

  );
}
