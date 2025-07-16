import * as React from 'react';

export function CalculatorDisplay({display}) {
  return (
    <div  className='calculator-display'>
      <input id='display' className='text-right h1' value={display} readOnly/>
    </div>
  );
}
