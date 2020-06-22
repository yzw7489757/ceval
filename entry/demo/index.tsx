/* eslint-disable no-console */
import React from 'react'
import { Input, message, Card, Form, Switch } from 'antd'
import Parser from '../../src/index';
import { CevalOptions } from '../../src/interface';

const { Search } = Input;

const options = new CevalOptions()

function toString (fn: Function, replcer = '&nbsp;') {
  return fn.toString().replace(/\t|\n/g,'<br>').replace(/\s/g, replcer)
}

const transfer = (key, value) => {
  switch(typeof value) {
    case 'function': {
      return toString(value, '&nbsp;&nbsp;')
    }
    case 'undefined': {
      return 'undefined'
    }
    case 'symbol': {
      return value.toString();
    }
    default: {
      return value
    }
  }
}

const presetVal = {
  target:{
    array: [1,2,3,4],
    fn: function fn() {
      return this.array
    }
  }
}

export default (): JSX.Element => {
  const parser = React.useRef((() => {
    const instance = new Parser({
      allowOperatorsCovered: true
    })
    instance.updatePresetValues(presetVal)
    return instance
  })());


  console.log(parser.current.getCurrentValues())
  const [result, setResult] = React.useState(() => parser.current.getOptions().defaultReturnValues)
  const [time, setTime] = React.useState(0)
  const values = React.useRef(parser.current.getCurrentValues())

  const execExpression = React.useCallback((str) => {
    try {
      const newTime = performance.now()
      setResult(() => parser.current.parseString(str))
      values.current = parser.current.getCurrentValues();
      setTime(performance.now() - newTime);
    } catch (err) {
      console.error(err);
      message.error(`运算出错 ${err.message}`)
    }
  }, [])

  const triggerToToogleOption = React.useCallback((optName, value) => {
    parser.current.updateOptions({
      [optName]: value
    })
  }, [])

  return (
    <div className="cardWrap">
      <Card title="Result" extra={`time consuming:${time}`} className="cardItem">
        <Search
          placeholder="enter expression"
          enterButton="calc"
          size="large"
          onSearch={execExpression}
        />
        <br /> &nbsp;
        <pre>
          <div dangerouslySetInnerHTML={{__html: typeof result === 'function'? toString(result, '&nbsp;') : JSON.stringify(result, transfer, 4) }}></div>
        </pre>

        <h3>CurrentValues</h3>
          
        <pre>
        <div dangerouslySetInnerHTML={{ __html: JSON.stringify(values.current, transfer, 4) }} /> 
        </pre>
      </Card>

      <Card title="Options" className="cardItem">
        <Form>
          {
            Object.keys(options).map(opt => {
              if (opt === 'defaultReturnValues') {
                return (
                  <Form.Item label={opt} key={opt} help="value is string">
                    <Input onChange={(e) => triggerToToogleOption(opt, e.target.value)} />
                  </Form.Item>
                )
              }
              return (
                <Form.Item label={opt} key={opt}>
                  <Switch defaultChecked={options[opt]} onChange={(status) => triggerToToogleOption(opt, status)} />
                </Form.Item>
              )
            })
          }
        </Form>
      </Card>
    </div>
  )
}