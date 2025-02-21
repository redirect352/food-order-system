'use client'
import { Skeleton } from "@mantine/core";
import { useGetMenuListQuery } from "@/lib/api/moderatorApi";
import MenuListForm from "@/components/forms/MenuListForm";

const MenuList = () => {
  return (
    <MenuListForm />
  );
};

export default MenuList;