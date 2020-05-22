import React from 'react'
// import Parser from '@ali/ceval';
import Parser from '../../src/index';

export default () => {
  const parser = new Parser({
    endableBitNumber: false
  });
  // const result = parser.parseString(`0b01`)
  // console.log('result: ', result);
  console.log(parser.parseString(`c[1]`, {a:1,c: [1,2,3], b:{c: (a,b,c) => { return a+b+c }}}));
  console.log(parser.getCurrentValues())

  return <div>123</div>
}