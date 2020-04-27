import React from 'react'
import Parser from '../../src/index';

export default () => {
  console.log(new Parser({}).parser(`cos(aaa) + 3`))

  return <div>123</div>
}