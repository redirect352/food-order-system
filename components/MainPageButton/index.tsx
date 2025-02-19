'use client';

import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { useAppSelector } from "../../shared/hooks";
import { selectIsLoggedIn, selectUserRole } from "../../lib/features/user/userSlice";

interface MainPageButtonProps extends ButtonProps {}

const MainPageButton = (props: MainPageButtonProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const role = useAppSelector(selectUserRole);
  const getLink = () => {
    if(isLoggedIn === undefined) return '';
    if(isLoggedIn === false || !role) return '/login'
    return `/${role.replaceAll('_', '-')}`;
  }
  return (
    <Link href={getLink()}>
      <Button
        variant="gradient"
        gradient={{ from: 'red', to: 'yellow' }}
        size="xl"
        mt={40}
        {...props}
        loading={isLoggedIn===undefined}
      >
        В меню
      </Button>
  </Link>
  );
};

export default MainPageButton;