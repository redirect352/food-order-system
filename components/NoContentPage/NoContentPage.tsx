import { Box, Button, Flex, Title } from '@mantine/core';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ImageWithFallback } from '@/UI';
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
      <Box className={classes.noDishPicture} pos="relative">
        <ImageWithFallback
          sizes="(max-width: 460px) 300px 300px, (max-width: 564px) 400px 400px, (min-width: 565px) 500px 500px"
          src={img}
          alt="menu is empty"
          fill
          priority
        />
      </Box>
      <Flex direction="column" gap="16px" align="center">
        <Title order={3} ta="center">
          {label}
        </Title>
        {
          buttonLabel &&
          <Link href={href!} replace>
            <Button size="md" radius="xl">{buttonLabel}</Button>
          </Link>
        }
      </Flex>
    </Flex>
  );

export default NoContentPage;
