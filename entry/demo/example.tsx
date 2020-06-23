import React from 'react';
import Ceval from '../../src/index';

const example = () => {
  var parse = new Ceval({
  }).parseString;
  console.log(parse(`
  var p_inf=+Infinity;
  var inf=Infinity;
  return p_inf!==inf
  return 2
  `))
  console.log(parse(`1 in [1, 2, 3]`))
  return (
    <div>
      
    </div>
  );
}

export default example;
