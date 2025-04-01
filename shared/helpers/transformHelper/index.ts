import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { formatDate } from "../formatHelper";
dayjs.extend(customParseFormat);

export const periodToString = (period: [Date | null, Date | null]): string => {
    if(period[0] && !period[1]) return  formatDate(period[0], 'issued');
    if(period[0] && period[1]) return  period.map(p => formatDate(p!, 'issued')).join(',');
    return '';
  }
export const stringToPeriod = (periodString: string): [Date | null, Date | null] => {
  if(!periodString) return [null, null];
  const periods =  periodString.split(',').map(i => dayjs (i,'DD.MM.YYYY').toDate());
  return [periods[0] ?? null, periods[1] ?? null];
}