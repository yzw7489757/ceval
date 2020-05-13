import React from 'react'
import Parser from '../../src/index';

export default () => {
  console.log(new Parser().parseString(`\'a\' in { a: 1, b: 2, c: 3, d: { e: 4, f: 5}}`));

  return <div>123</div>
}