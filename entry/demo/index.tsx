import React from 'react'
import Parser from '../../src/index';

export default () => {
  const parser = new Parser();

  console.log(parser.parseString(`var a = { b: { c: ['a','b','c','d']} };\'\'c\'\' in a`, {}));

  console.log(parser.getCurrentValues())

  return <div>123</div>
}