'use client';

import { Stack, Title, Button, StackProps } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useLazyOrderExportDocxQuery, periodStringFormat } from "../../../lib/api/moderatorApi";
import classes from './styles.module.scss';
import { NotificationService } from "../../../shared/services";

interface ExportOrdersFormProps extends StackProps {} 

const ExportOrdersForm = (props: ExportOrdersFormProps) => {
  const [query, {isFetching}] = useLazyOrderExportDocxQuery();
  const form = useForm({
    mode:'uncontrolled',
    initialValues: {
      periodStart: dayjs(new Date()).set('h', 8).set('m', 15).toDate(),
      periodEnd: dayjs(new Date()).set('m', 60).toDate(),
    },
    validate:{
      periodStart: (val, {periodEnd}) => {
        if(!val) return 'Дата не установлена';
        if(val > periodEnd) return 'Дата начала периода должна быть меньше даты окончания периода'
        return null;
      },
      periodEnd: (val) => {
        if(!val) return 'Дата не установлена';
        return null;
      }
    }
  });
  const downloadFile = async () => {
    if(form.validate().hasErrors) return;
    const values = form.getValues();
    const params = { 
      periodStart: dayjs(values.periodStart).format(periodStringFormat),
      periodEnd: dayjs(values.periodEnd).format(periodStringFormat),
    };
    const {data, error} = await query(params);
    if(error){
      NotificationService.showErrorNotification({
        title:'Ошибка выгрузки заказов',
        message: error?.message ?? `Возникла непредвиденная ошибка. Невозможно скачать отчет о заказах`
      })
    }else{
      NotificationService.showSuccessNotification({
        title:'Список заказов получен',
        message: 'Заказы пользователей включенные в отчет будут помечены как принятые',
      })
    }
  }
  return (
    <Stack {...props}>
      <Title>
        Выгрузка заказов пользователей
      </Title>
      <DateTimePicker
        valueFormat="DD MMMM YYYY HH:mm"
        label="Заказы созданные начиная с"
        placeholder="выберите дату"
        disabled={isFetching}
        key={form.key('periodStart')}
        {...form.getInputProps('periodStart')}
      />
      <DateTimePicker
        valueFormat="DD MMMM YYYY HH:mm"
        label="Заказы созданные по"
        placeholder="выберите дату"
        disabled={isFetching}
        maxDate={dayjs().set('h',24).set('m',0).toDate()}
        key={form.key('periodEnd')}
        {...form.getInputProps('periodEnd')}
      />
      <Button 
        className={classes.submitButton} 
        onClick={downloadFile}
        loading={isFetching}
      >
        СКАЧАТЬ
      </Button>
    </Stack>
  )
};

export default ExportOrdersForm;