import beep from "./assets/beep.mp3";
import startBeep from "./assets/beep.mp3";
import { FaTruckLoading } from 'react-icons/fa';
import { useRef, useState } from "react";
import type { TPomodoroMode, TPomodoroOptions } from "./types/Pomodoro/types";
import Clock from "./components/Pomodoro/Clock";
import ChangeTime from "./components/Pomodoro/ChangeTime";
import { ls } from "./helpers";


const DEFAULTS: TPomodoroOptions = {
  min: 1 * 60,
  max: 60 * 60,
  mode: 'session',
  session: 25 * 60,
  break: 5 * 60,
  long: 15 * 60,
  rounds: 0,
  cycles: 4,
  autoplay: false,
}
const POMODORO_MODES: TPomodoroMode[] = ['session', 'break', 'long'];




function PomodoroApp() {
  const [ options, setOptions ] = useState<TPomodoroOptions>(ls.get('pomodoro:options', DEFAULTS));
  const [ mode, setMode ] = useState<TPomodoroMode>('session');
  const [ isRunning, setIsRunning ] = useState(false);
  const [ remaining, setRemaining ] = useState( options[mode] );
  const startBeepRef = useRef<HTMLAudioElement | null>(null);
  const beepRef = useRef<HTMLAudioElement | null>(null);

  const playAlarm = () => {
  const alarm = beepRef.current;
  if (!alarm) return;
      alarm && alarm.play();
  }
  const pauseAlarm = () => {
  const alarm = beepRef.current;
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
      let nextMode: TPomodoroMode = 'session';
      //Else wenn nextRound mod cycles === 0 -> long, else break
      if (prev.mode === 'session') {
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
    setMode('session');
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
      console.log('app render', options)


  return (
      <div className="container w-100 h-100 bg-1 d-flex justify-content-center align-items-center position-relative">
          <audio className="opacity-0 position-absolute" src={startBeep} id="start-beep" ref={startBeepRef}></audio>
          <audio className="opacity-0 position-absolute" src={beep} id="beep" ref={beepRef}></audio>
          <div className="pomodoro-wrapper container-sm border border-width-2 bg-2 py-3 px-2">
            <div className="row">
              <div className="d-flex justify-content-center align-items-center gap-2">
                {/* <ModeButton handler={handleChangeMode} target={'session'} mode={mode}></ModeButton>
                <ModeButton handler={handleChangeMode} target={'break'} mode={mode}></ModeButton>
                <ModeButton handler={handleChangeMode} target={'long'} mode={mode}></ModeButton> */}
              </div>
            </div>
            <div className="row my-2">
              <Clock options={options} mode={mode} alarmRef={startBeepRef} remaining={remaining} setRemaining={setRemaining} isRunning={isRunning} handleTimeOver={handleTimeOver}></Clock>
              <h1 id="timer-label" className='text-center'>{mode.toUpperCase()}</h1>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center">
                <button id="start_stop" className='btn btn-primary' onClick={() => setIsRunning(!isRunning)}><h3>{isRunning ? 'PAUSE':'START'}</h3></button>
                <button id="reset" className='btn btn-primary ms-3' onClick={handleReset}><h4><FaTruckLoading/></h4></button>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center">
                {POMODORO_MODES.map((mode) => <ChangeTime min={options.min} max={options.max} isRunning={isRunning} modeTime={options[mode]} targetMode={mode} setOptions={setOptions} setRemaining={setRemaining} ></ChangeTime>)}
              </div>
            </div>
          </div>
      </div>
  )
}

export default PomodoroApp;
