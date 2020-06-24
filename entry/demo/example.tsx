import React from 'react';
import Ceval from '../../src/index';

var parse = new Ceval({
}).parseString;
console.log(parse(`(1*pow(2,52)*pow(2,971)) === 8.98846567431158e+307`))

const example = () => {
  
  return (
    <div>
      
    </div>
  );
}

export default example;
