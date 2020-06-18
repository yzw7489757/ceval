import React from 'react';
import { render } from 'react-dom';
import { Material } from 'dev-dashboard'
import { name } from '../package.json';
import menuDataList from './ui-json';
import './index.less';

render(<Material routes={menuDataList} basePath={name} title={name} />,  document.getElementById('root'))