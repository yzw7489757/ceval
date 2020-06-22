import { NumberOutlined } from '@ant-design/icons';
import Demo from './demo/index'
import Example from './demo/example'

export default [
  {
    name: 'Demo',
    path: '/demo',
    icon: NumberOutlined,
    component: Demo,
  },
  {
    name: 'example',
    path: '/example',
    icon: NumberOutlined,
    component: Example,
  },
];