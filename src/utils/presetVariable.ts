import { getTime } from './index';
import { name, version } from '../../package.json';

const [date, time] = getTime()

export default {
  now: Date.now(),
  date,
  time,
  name,
  version
}