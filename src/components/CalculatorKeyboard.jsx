import * as React from 'react';

const keys = [
  { text: 'AC', id: 'clear', klazz: 'bg-danger'},
  { text: 'C', id: 'delete', klazz: 'bg-danger'},
  { text: '%', id: 'percentage', klazz: 'bg-secondary'},
  { text: '/', id: 'divide', klazz: 'bg-secondary'},
  { text: '7', id: 'seven', klazz: 'bg-dark text-light'},
  { text: '8', id: 'eight', klazz: 'bg-dark text-light'},
  { text: '9', id: 'nine', klazz: 'bg-dark text-light'},
  { text: 'x', id: 'multiply', klazz: 'bg-secondary'},
  { text: '4', id: 'four', klazz: 'bg-dark text-light'},
  { text: '5', id: 'five', klazz: 'bg-dark text-light'},
  { text: '6', id: 'six', klazz: 'bg-dark text-light'},
  { text: '-', id: 'subtract', klazz: 'bg-secondary'},
  { text: '1', id: 'one', klazz: 'bg-dark text-light'},
  { text: '2', id: 'two', klazz: 'bg-dark text-light'},
  { text: '3', id: 'three', klazz: 'bg-dark text-light'},
  { text: '+', id: 'add', klazz: 'bg-secondary'},
  { text: '+/-', id: 'toggler', klazz: 'bg-dark text-light'},
  { text: '0', id: 'zero', klazz: 'bg-dark text-light'},
  { text: '.', id: 'decimal', klazz: 'bg-dark text-light'},
  { text: '=', id: 'equals', klazz: 'bg-info'},
]
const operators = ['+', 'x', '-', '/'];
//Wenn Ziffer, dann key-1
//Wenn top, dann key-2
//Wenn side, dann key-3
//Wenn A oder C, rot

//Key haben handler
//Ziffer, Operatoren changeInput
//Operator pressen, Erste num definieren, display zu 0 machen, result is immer A + parseFloat(display)
//Equals pressen, Second num definieren, display gleich als result machen, operator wieder zu 0
export function CalculatorKeyboard({ display, setDisplay, firstNum, setFirstNum, operator, setOperator, result,  setResult }) {
  const handleClear = () => {
    setDisplay('0');
    setResult('0');
    setFirstNum(0);
  };
  const handleDelete = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay((prev) => prev.toString().slice(0, prev.length-1));
    }
  };
  const handlePercentage = () => {
    if (result.length > 0) {
      const resultNumber = parseFloat(result);
      setResult((resultNumber/100).toString()) 
    } 
  };
  const handleTogglerSign = () => {
    
  };
  const handleEquals = () => {
    // wenn second number has not changed, dann return;
    
    switch (operator) {
      case '+': {
        setResult((firstNum + parseFloat(display)));
        setDisplay((firstNum + parseFloat(display)));
        break;
      }
      case '-': {
        setResult((firstNum - parseFloat(display)));
        setDisplay((firstNum - parseFloat(display)));
          break;
        }
      case 'x': {
        setResult((firstNum * parseFloat(display)));
        setDisplay((firstNum * parseFloat(display)));
          break;
        }
      case '/': {
        setResult((firstNum / parseFloat(display)));
        setDisplay((firstNum / parseFloat(display)));
          return (firstNum / parseFloat(display));
        }
      }//click op, 
      //Resul = 0
      // A = 
  };
  const handleOperator = (key) => {
      if (display === '0' && key.text === '-') {
        setDisplay('-');
      } else {
        setDisplay('0');
        setOperator(key.text);
        setFirstNum(solveCurrentEquation());
      }
  }
  const handleInput = (key) => {

    if (key.text === '.') {
      if ( !display.includes('.')) {
        setDisplay((prev) => (prev+=key.text));
      } else return;
    } else if (display === '0') {
      if (key.text === '.') {
        setDisplay('0.');
      } else {
        setDisplay(key.text);
      }
    } else {
      setDisplay((prev) => (prev+=key.text));
    }
  };
  const solveCurrentEquation = () => {
      switch (operator) {
      case '+': {
          return (result = parseFloat(display));
      }
      case '-': {
          return (result - parseFloat(display));
        }
      case 'x': {
          return (result * parseFloat(display));
        }
      case '/': {
          return (result / parseFloat(display));
        }
      }
  }
  return (
    <div id='calculator-keyboard' className='keyboard'>
      {keys.map((key) => {
        return ( <div key={key.id} className={`calculator-key ${key.klazz}`} id={key.id} onClick={() => {
          switch (key.text) {
            case 'AC': { 
              handleClear();
              break;
            }
            case 'C': { 
              handleDelete();
              break;
            }
            case '%': { 
              handlePercentage();
              break;
            }
            case '+/-': { 
              handleTogglerSign();
              break;
            }
            case '=': { 
              handleEquals();
              break;
            }
            default: {
              if (operators.includes(key.text)) {
                handleOperator(key);
              } else {
                handleInput(key);
              }
              break;
            }
          }
        }}>
          <span>{key.text}</span>
        </div> )})}
      </div>
    );
}
