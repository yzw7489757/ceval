import React from 'react'
import Parser from '../../src/index';

export default () => {
  console.log(new Parser({}).parseString(`!false`));
  

  return <div>123</div>
}