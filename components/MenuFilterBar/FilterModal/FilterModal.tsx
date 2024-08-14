'use client';

import { Grid, ModalProps, Title } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import { MobilePillsInput, MobileModal } from '@/UI';

interface FilterModalProps extends ModalProps {
}
const dishTypeData = ['Первые блюда', 'Вторые блюда', 'Третие блюда', 'Холодные закуски', 'Гарнир', 'Сладкие блюда'];

const FilterModal: FunctionComponent<FilterModalProps> = (props) => {
  const [productCategory, changeProductCategory] = useState<string[]>([]);
  const [dishCategory, changeDishCategory] = useState<string[]>([]);

  return (
    <MobileModal
      {...props}
      zIndex="var(--first-modal-z-index)"
      showAccept
    >
      <Grid gutter={10} align="center" px="sm">
        <Grid.Col span={5}>
          <Title order={4}>Тип продукции:</Title>
        </Grid.Col>
        <Grid.Col span={7}>
          <MobilePillsInput
            // data={typeOptions}
            data={[]}
            values={productCategory}
            setValues={changeProductCategory}
            w="100%"
            modalTitle="Выберите тип продукции"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <Title order={4}>Тип блюда:</Title>
        </Grid.Col>
        <Grid.Col span={7}>
          <MobilePillsInput
            data={dishTypeData}
            values={dishCategory}
            setValues={changeDishCategory}
            w="100%"
            modalTitle="Выберите тип продукции"
          />
        </Grid.Col>
      </Grid>
    </MobileModal>
  );
};
export default FilterModal;
