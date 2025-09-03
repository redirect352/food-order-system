import { ImageList, OfficeFilter, SearchInput, SortOrderFilterBar } from "@/components"
import { Box, Stack } from "@mantine/core";
import classes from './styles.module.scss';

const ImagesPage = () => {
  return (
    <Box className={classes.pageBox}>
      <Stack className={classes.filterBox}>
        <SortOrderFilterBar sortFieldsOptionsDef={[
          {label:'id', 'value':'id'},
          {label:'Дата загрузки', 'value':'uploaded'},
        ]}>
          <OfficeFilter 
            placeholder="Столовая ТП-2"
            officeType='canteen' 
            searchParam={"office"} 
          />
        </SortOrderFilterBar>
        <SearchInput
          className={classes.search}
          placeholder="Введите подсказки изображения"
        />
      </Stack>
      <ImageList />
    </Box>
  );
};

export default ImagesPage;