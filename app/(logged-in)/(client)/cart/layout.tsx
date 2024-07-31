import { Box } from '@mantine/core';
import classes from './styles.module.scss';

export default function MenuLayout({ children }: { children: any }) {
  return (
     <Box className={classes.cartContainer}>
        { children }
     </Box>
  );
}
