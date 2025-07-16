import * as React from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKeyboard } from './CalculatorKeyboard';

export function Calculator() {
    const [ display, setDisplay ] = React.useState('0');
    const [ firstNum, setFirstNum ] = React.useState(0);
    const [ secondNum, setSecondNum ] = React.useState(0);
    const [ operator, setOperator ] = React.useState('');
    const [ result, setResult ] = React.useState(0);
  return (
    <div id='calculator' className='container mw-550'>
      <CalculatorDisplay display={display}/>
      <CalculatorKeyboard 
        display={display} setDisplay={setDisplay}
        firstNum={firstNum} setFirstNum={setFirstNum }
        secondNum={secondNum} setSecondNum={setSecondNum }
        operator={operator} setOperator={setOperator}
        result={result} setResult={setResult} />
    </div>
  );
}
