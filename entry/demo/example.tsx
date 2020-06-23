import React from 'react';
import Ceval from '../../src/index';

const example = () => {
  var parse = new Ceval({
  }).parseString;
  console.log(parse(`
  var a = { b: 2, c: 3 };
  var b = 'c';
  a[b]
  `))
  return (
    <div>
      
    </div>
  );
}

export default example;
