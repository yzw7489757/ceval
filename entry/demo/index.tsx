import React from 'react'
import Parser from '@ali/ceval';
// import Parser from '../../src/index';

export default () => {
  const parser = new Parser();
  // const result = parser.parseString(`0b01`)
  // console.log('result: ', result);
  console.log(parser.parseString(`
  function abs(a,b,c) { 
    var a = 5;
    let b = 1; /* warn */
    c = 2;
    const d = 4; /* dont't warn */
    return(a+b+c);
  };
  abs(3,4,8)`, {a:1, b:{c: (a,b,c) => { return a+b+c }}}));
  console.log(parser.getCurrentValues())

  return <div>123</div>
}