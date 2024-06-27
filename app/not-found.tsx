import { Box, Button, Flex, Title } from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import notFound2 from '@/public/404.png';
import classes from './styles.module.scss';

interface Props {

}

const NotFound : FunctionComponent<Props> = () => (
      <Flex direction="column" gap="48px" justify="flex-start" align="center" h="100%">
        <Flex direction="column" gap="28px" align="center">
          <Box pos="relative" className={classes.notFoundImageBox}>
            <Image src={notFound2} alt="page not found" fill></Image>
          </Box>
        </Flex>
        <Flex direction="column" gap="16px" align="center">
          <Title order={3} ta="center">
            К сожалению данная страница не найдена
          </Title>
          <Link href="/" replace>
            <Button size="md">Вернуться в меню</Button>
          </Link>
        </Flex>
      </Flex>
  );

export default NotFound;
