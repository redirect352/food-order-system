import { Box, Button, Flex, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import classes from './styles.module.scss';

interface EmptyDishListProps {
  label: string,
  buttonLabel?: string,
  href?: string,
  img: string | StaticImport
}

const NoContentPage: FunctionComponent<EmptyDishListProps> =
  ({ label, buttonLabel, href, img }) => (
    <Flex direction="column" gap="48px" justify="flex-start" align="center">
      <Box pos="relative" className={classes.noDishPicture}>
        <Image src={img} alt="menu is empty" fill></Image>
      </Box>
      <Flex direction="column" gap="16px" align="center">
        <Title order={3} ta="center">
          {label}
        </Title>
        {
          buttonLabel &&
          <Link href={href!} replace>
            <Button size="md">{buttonLabel}</Button>
          </Link>
        }
      </Flex>
    </Flex>
  );

export default NoContentPage;
