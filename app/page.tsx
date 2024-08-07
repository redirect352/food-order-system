import { Container, Title, Text, Button, Affix, Box } from '@mantine/core';
import Link from 'next/link';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import classes from './styles.module.scss';

export default function HomePage() {
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
              </Text><br />
                ГП {' '} «Минсктранс»

            </Title>

            <Text className={classes.description} mt={30}>
              Выбирайте блюда и полуфабрикаты из меню обслуживающей столовой ГП «Минсктранс», заказывайте доставку,{' '}
              отслеживайте статус доставки и получайте заказы с помощью системы заказа питания.
            </Text>
            <Link href="/client/menu">
              <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'yellow' }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                В меню
              </Button>
            </Link>
            <Affix position={{ top: 0, left: 20 }} visibleFrom="sm">
              <ColorSchemeToggle />
            </Affix>
          </div>
        </div>
      </Container>
    </Box>

  );
}
