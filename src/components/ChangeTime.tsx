import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { clamp, parseTime } from "../PomodoroApp"

export default function ChangeTime({ time, running, target, mode, setSettings, setRemaining }) {
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
          target === mode && setRemaining(clamp(time+60))
        } else {
          setSettings((prev) => ({...prev, BREAK: clamp(time-60)})); 
            target === mode && setRemaining(clamp(time-60))    
        }
        break;
      };
      case 'long': {
        if (increase) {
          setSettings((prev) => ({...prev, LONG: clamp(time+60)})); 
          target === mode && setRemaining(clamp(time+60))
        } else {
          setSettings((prev) => ({...prev, LONG: clamp(time-60)})); 
            target === mode && setRemaining(clamp(time-60))    
        }
        break;
      };
      case 'session': {
        if (increase) {
          setSettings((prev) => ({...prev, SESSION: clamp(time+60)}));
            target === mode && setRemaining(clamp(time+60))
        } else {
          setSettings((prev) => ({...prev, SESSION: clamp(time-60)})); 
            target === mode && setRemaining(clamp(time-60))
        }
        break;
      };
    }
  }

  return (

      <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
        <h4 id={ids.length} className="my-0">{time/60}</h4>  
        <div className="d-flex justify-content-center align-items-center gap-1">
          <button id={ids.decrement} className="btn btn-info" onClick={() => { changeTime(false) }}>
            <FaArrowDown/>
          </button>
          <button id={ids.increment} className="btn btn-info" onClick={() => { changeTime(true) }}>
            <FaArrowUp/>
          </button>
        </div>
        <span id={ids.label} className="basis-100 flex-grow-1 fw-bold">{label}</span>
      </div>
  )
}

