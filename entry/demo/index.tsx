/* eslint-disable no-console */
import React from 'react'
import { Input, message, Card } from 'antd'
import Parser from '../../src/index';

const { Search } = Input;

export default (): JSX.Element => {
  const parser = new Parser({
    endableBitNumber: true,
    // allowHandleNumberPrecision: true
  });
  const [result, setResult] = React.useState(null)
  const time = React.useRef<number>(0)
  const execExpression = React.useCallback((str) => {
    try{
      const newTime = performance.now()
      setResult(parser.parseString(str))
      time.current = performance.now() - newTime;

      console.log(parser.getCurrentValues())
    }catch(err){
      console.error(err);
      message.error('运算出错', err)
    }
  }, [])

  return <div>
    <Card title="结果" extra={time.current+'ms'} style={{ width: 500 }}>
      <Search
        placeholder="输入"
        enterButton="运算"
        size="large"
        onSearch={execExpression}
      />
      <br/> &nbsp;
      <p>{JSON.stringify(result, null, 4)}</p>
    </Card>
  </div>
}