'use client';

import { Grid, ModalProps, Title } from '@mantine/core';
import { FunctionComponent, useState } from 'react';
import { FullScreenPillsInput, MobileModal } from '@/UI';

interface FilterModalProps extends ModalProps {
}
const prodTypeData = ['Собственного производства', 'Прочее'];
const dishTypeData = ['Первые блюда', 'Вторые блюда', 'Третие блюда', 'Холодные закуски', 'Гарнир', 'Сладкие блюда'];

const FilterModal: FunctionComponent<FilterModalProps> = (props) => {
  const [productCathegory, changeProductCathegory] = useState<string[]>([]);
  const [dishCathegory, changeDishCathegory] = useState<string[]>([]);

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
          <FullScreenPillsInput
            data={prodTypeData}
            values={productCathegory}
            setValues={changeProductCathegory}
            w="100%"
            modalTitle="Выберите тип продукции"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <Title order={4}>Тип блюда:</Title>
        </Grid.Col>
        <Grid.Col span={7}>
          <FullScreenPillsInput
            data={dishTypeData}
            values={dishCathegory}
            setValues={changeDishCathegory}
            w="100%"
            modalTitle="Выберите тип продукции"
          />
        </Grid.Col>
      </Grid>
    </MobileModal>
    // <Modal.Root
    //   fullScreen
    //   {...props}
    //   zIndex="var(--first-modal-z-index)"
    // >
    //   <Modal.Content>
    //     <Modal.Header>
    //       <Modal.CloseButton
    //         icon={<IconChevronLeft size={32} stroke={1.5} />}
    //         style={{ marginInlineStart: 0 }}
    //       />
    //       <Modal.Title fw="bold">{props.title}</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <Grid gutter={10} align="center">
    //         <Grid.Col span={5}>
    //           <Title order={4}>Тип продукции:</Title>
    //         </Grid.Col>
    //         <Grid.Col span={7}>
    //           <FullScreenPillsInput
    //             data={prodTypeData}
    //             values={productCathegory}
    //             setValues={changeProductCathegory}
    //             w="100%"
    //             modalTitle="Выберите тип продукции"
    //           />
    //         </Grid.Col>
    //         <Grid.Col span={5}>
    //           <Title order={4}>Тип блюда:</Title>
    //         </Grid.Col>
    //         <Grid.Col span={7}>
    //           <FullScreenPillsInput
    //             data={dishTypeData}
    //             values={dishCathegory}
    //             setValues={changeDishCathegory}
    //             w="100%"
    //             modalTitle="Выберите тип продукции"
    //           />
    //         </Grid.Col>
    //       </Grid>
    //     </Modal.Body>
    //   </Modal.Content>
    // </Modal.Root>
  );
};
export default FilterModal;
