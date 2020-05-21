import { getTime } from './index';

const [date, time] = getTime()

export default {
  now: Date.now(),
  date,
  time,
}