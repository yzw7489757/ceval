import React from 'react';
import Ceval from '../../src/index';

const example = () => {
  var parse = new Ceval().parseString;
  console.log(parse(`function abs(a,b,c) { 
    a = 5;
    return(a);
  };
  abs(3,4,8)`))
  return (
    <div>
      
    </div>
  );
}

export default example;
