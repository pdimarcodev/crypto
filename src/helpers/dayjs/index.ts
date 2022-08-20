import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(calendar);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const setupDayjs: () => void = () => {
  dayjs.locale('us');
};

export default dayjs;
