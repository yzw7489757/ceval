
/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('binary =', () => {
  // TODO: support assignment literal declaration
  const value = { a: 1, b: { c: (a, b, c) => { return a + b + c } } }
  expect(parse(`var obj = { a: '1'};`)).toEqual(''); // 没有指定返回语句

  expect(parse(`
    function abs(a,b,c) { 
      return(a);
    };
    abs(3,4,8)`, value)).toEqual(3);

  expect(parse(`
    function abs(a,b,c) { 
      return(a+b);
    };
    abs(3,4,8)`, value)).toEqual(7);

  expect(parse(`
    function abs(a,b,c) { 
      a = 5;
      return(a);
    };
    abs(3,4,8)`, value)).toEqual(5);

  expect(parse(`
    function abs(a,b,c) { 
      a = 5;
      return(a+b);
    };
    abs(3,4,8)`, value)).toEqual(9);

  expect(parse(`
    function abs(a,b,c) { 
      a = 5;
      b = 1;
      return(a+b);
    };
    abs(3,4,8)`, value)).toEqual(6);

  expect(parse(`
    function abs(a,b,c) { 
      a = 5;
      b = 1;
      c = 2;
      return(a+b+c);
    };
    abs(3,4,8)`, value)).toEqual(8);

  // var 申明语句不会影响到scope, 而是inject到values, 
  // let 和 const 都赋值到当前 scope 上, 当前scope如果存在则warn
  expect(parse(`
    function abs(a,b,c) { 
      var a = 5;
      /* let b = 1; warn */
      c = 2;
      const d = 4; /* not warn */
      return(a+b+c);
    };
    abs(3,4,8)`, value)).toEqual(9);

  

}, 0)