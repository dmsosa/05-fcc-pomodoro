import beep from "./assets/beep.mp3";
import { FaTruckLoading } from 'react-icons/fa';
import ModeButton from './components/ModeButton';
import { useEffect, useRef, useState } from "react";
import type { TPomodoroMode, TPomodoroOptions } from "./types/Pomodoro/types";
import Clock from "./components/Pomodoro/Clock";


const DEFAULTS: TPomodoroOptions = {
  mode: 'work',
  work: 2,
  break: 5 * 60,
  long: 15 * 60,
  rounds: 0,
  cycles: 4,
  autoplay: false,
}

const ls = {
  get: (key: string, fallback: any) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
};



function PomodoroApp() {
  const [ options, setOptions ] = useState<TPomodoroOptions>(ls.get('pomodoro:options', DEFAULTS));
  const [ mode, setMode ] = useState<TPomodoroMode>('work');
  const [ isRunning, setIsRunning ] = useState(false);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  const playAlarm = () => {
  const alarm = alarmRef.current;
  if (!alarm) return;
      alarm && alarm.play();
  }
  const pauseAlarm = () => {
  const alarm = alarmRef.current;
  if (!alarm) return;
      alarm && alarm.pause();
  }
  const handleTimeOver = () => {
    if (!options.autoplay) {
      setIsRunning(false);
    };
    //setMode, it will re-render Clock, and update time accordingly (vielleicht ohne useEffect?)
    setOptions((prev) => {
      //Wenn aktuellMode break oder long ist, dann work setzen;
      const nextRound = prev.rounds + 1;
      let nextMode: TPomodoroMode = 'work';
      //Else wenn nextRound mod cycles === 0 -> long, else break
      if (prev.mode === 'work') {
        if (nextRound % 2 === 0) {
          nextMode = 'long';
        } else {
          nextMode = 'break';
        }
      };
      return {...prev, mode: nextMode };
    }); 
  }

  // const handleFinish = () => {
  //   const nextRound = round + 1;
  //   if (mode === 'session') {
  //     if (nextRound % settings.CYCLES === 0 ) {
  //       setMode('long');
  //       setRemaining(settings.LONG);
  //     } else {
  //       setMode('break');
  //       setRemaining(settings.BREAK);
  //     }
  //       setRound(nextRound);
  //       setRunning(autoplay ? true : false);
  //   } else {
  //       setMode('session');
  //       setRemaining(settings.SESSION);
  //       setRound(nextRound);
  //       setRunning(autoplay ? true : false);
  //   }
  // }
  const handleReset = () => {
    setIsRunning(false);
    setOptions(DEFAULTS);
    setMode('work');
  }
  // const  handleChangeMode = (e: MouseEvent<HTMLButtonElement>) => {
  //   const btn = e.currentTarget;
  //   const target = btn.dataset.target;
  //   switch (target) {
  //     case 'break': {
  //       setMode('break');
  //       setRemaining(settings.BREAK);
  //       setRunning(false);
  //       break;
  //     };
  //     case 'long': {
  //       setMode('long');
  //       setRemaining(settings.LONG);
  //       setRunning(false);
  //       break;
  //     };
  //     case 'session': {
  //       setMode('session');
  //       setRemaining(settings.SESSION);
  //       setRunning(false);        
  //       break;
  //     };
  //   }

  //   const audio = document.getElementById('beep') as HTMLAudioElement;
  //   if (!audio) return;
  //   audio.pause();
  //   audio.currentTime = 0;
  // }
  

  return (
      <div className="container w-100 h-100 bg-1 d-flex justify-content-center align-items-center">
          <div className="pomodoro-wrapper container-sm border border-width-2 bg-2 py-3 px-2">
            <div className="row">
              <div className="d-flex justify-content-center align-items-center gap-2">
                {/* <ModeButton handler={handleChangeMode} target={'session'} mode={mode}></ModeButton>
                <ModeButton handler={handleChangeMode} target={'break'} mode={mode}></ModeButton>
                <ModeButton handler={handleChangeMode} target={'long'} mode={mode}></ModeButton> */}
              </div>
            </div>
            <div className="row my-2">
              <Clock options={options} mode={mode} isRunning={isRunning} handleTimeOver={handleTimeOver}></Clock>
              <h1 id="timer-label" className='text-center'>{mode.toUpperCase()}</h1>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center">
                <button id="start_stop" className='btn btn-primary' onClick={() => setIsRunning(!isRunning)}><h3>{isRunning ? 'PAUSE':'START'}</h3></button>
                <button id="reset" className='btn btn-primary ms-3' onClick={handleReset}><h4><FaTruckLoading/></h4></button>
                <audio src={beep} id="beep" ref={alarmRef}></audio>
              </div>
            </div>
          </div>
      </div>
  )
}

export default PomodoroApp;
