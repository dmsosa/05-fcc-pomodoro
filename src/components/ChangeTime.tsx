import { clamp, parseTime } from "../App"

export default function ChangeTime({ time, running, target, setSettings, setRemaining }) {
    const ids = {
        label: `${target.toLowerCase()}-label`,
        length: `${target.toLowerCase()}-length`,
        decrement:`${target.toLowerCase()}-decrement`,
        increment:`${target.toLowerCase()}-increment`
    };
    const label = `${target.toUpperCase()}-LENGTH`

    const changeTime = (increase=true) => {
    if (running) return;
    switch (target) {
      case 'break': {
        if (increase) {
          setSettings((prev) => ({...prev, BREAK: clamp(time+60)})); 
          setRemaining(clamp(time+60))
        } else {
          setSettings((prev) => ({...prev, BREAK: clamp(time-60)})); 
            setRemaining(clamp(time-60))    
        }
        break;
      };
      case 'session': {
        if (increase) {
          setSettings((prev) => ({...prev, SESSION: clamp(time+60)}));
            setRemaining(clamp(time+60))
        } else {
          setSettings((prev) => ({...prev, SESSION: clamp(time-60)})); 
            setRemaining(clamp(time-60))
        }
        break;
      };
    }
  }

  return (

      <div>
        <h2 id={ids.length}>{time/60}</h2>  
        <div className="d-flex justify-content-center align-items-center">
          <button id={ids.decrement} onClick={() => { changeTime(false) }}>
            down
          </button>
          <button id={ids.increment} onClick={() => { changeTime(true) }}>
            up
          </button>
        </div>
        <span id={ids.label}>{label}</span>
      </div>
  )
}

