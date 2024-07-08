// import { PageHeaderContainer } from '@/components';

import { Box } from '@mantine/core';
import classes from './styles.module.scss';

export default function MenuLayout({ children }: { children: any }) {
  return (
    // <PageHeaderContainer title="Корзина" subtitle="Для подтверждения заказа нажмите кнопку оформить заказ">
     <Box className={classes.cartContainer}>
        { children }
     </Box>
    // </PageHeaderContainer>
  );
}
