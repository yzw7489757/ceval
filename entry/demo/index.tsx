import React from 'react'
import Parser from '../../src/index';
import { Parser as P } from '../../src/local_demo/index'

export default () => {
  // console.log(new P({}).parse(`0||5`).evaluate({}))
  console.log(new Parser({}).parseString(``));
  
  // console.log(new P({}).parse(`aaa(1,2)^0`).evaluate({ aaa : (a,b) => a + b }))

  return <div>123</div>
}