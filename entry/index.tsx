import React from 'react';
import { render } from 'react-dom';
import MidLocalDemo from '@ali/mid-local-demo';

import { name } from '../package.json';

import menuDataList from './ui-json';

render(
  (
    <MidLocalDemo name={name} menuDataList={menuDataList} />
  ),
  document.getElementById('root')
);
