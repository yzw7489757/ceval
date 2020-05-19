/* eslint-disable no-undef */
import Parser from '../src/index'

const parse = new Parser().parseString

test('ternary ?', () => {
  expect(parse(`true?false:true`)).toEqual(false)
  expect(parse(`1?2:3`)).toEqual(2)
  expect(parse(`~-1?2:3`)).toEqual(3)
  expect(parse(`false?'true':'false'`)).toEqual('false')
  
  expect(parse(`1?(2?3:4):5`)).toEqual(3)
}, 0)

