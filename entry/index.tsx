import React from 'react';
import { render } from 'react-dom';
import { Material } from 'dev-dashboard'
import { name } from '../package.json';
import menuDataList from './ui-json';
import './index.less';

document.addEventListener('DOMContentLoaded', () => {
  render(<Material routes={menuDataList} title={name} />,  document.getElementById('root'))
})