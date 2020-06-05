/* eslint-disable no-console */
import React from 'react'
import { Input, message, Card, Form, Switch } from 'antd'
import Parser from '../../src/index';
import { CevalOptions } from '../../src/interface';
import { isObject } from '../../src/utils/index';

const { Search } = Input;

const options = new CevalOptions()

export default (): JSX.Element => {
  const parser = React.useRef(new Parser());

  const [result, setResult] = React.useState(() => parser.current.options.defaultReturnValues)
  const [time, setTime] = React.useState(0)
  const values = React.useRef(parser.current.getCurrentValues())

  const execExpression = React.useCallback((str) => {
    try {
      const newTime = performance.now()
      setResult(parser.current.parseString(str))
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


  const triggerToUpdatePresetValues = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    try {
      const presetValue = JSON.parse(e.target.value);
      if (isObject(presetValue)) {
        parser.current.updatePresetValues(presetValue)
        values.current = parser.current.getCurrentValues();
      } else {
        throw new Error('parse value must be an object')
      }
    } catch (err) {
      message.error(err.message)
    }
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
        <pre>{JSON.stringify(result, null, 4)}</pre>
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

      <Card title="Values" className="cardItem">
        <pre>
          {
            JSON.stringify(values.current, null, 4)
          }
        </pre>
      </Card>

      <Card title="Values" className="cardItem">
        <Input.TextArea rows={12} defaultValue={JSON.stringify(values.current, null, 4)} onBlur={triggerToUpdatePresetValues} />
      </Card>
    </div>
  )
}