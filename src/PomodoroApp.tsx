import beep from "./assets/beep.mp3";
import startBeep from "./assets/beep.mp3";
import { FaTruckLoading } from 'react-icons/fa';
import { useEffect, useRef, useState } from "react";
import type { TPomodoroMode, TPomodoroOptions } from "./types/Pomodoro/types";
import ChangeTime from "./components/Pomodoro/ChangeTime";
import { ls, parseTime } from "./helpers";
import { useInterval } from "./hooks";
import ModeButton from "./components/Pomodoro/ModeButton";

const POMODORO_STORAGE_KEY = 'pomodoro:options';
const DEFAULTS: TPomodoroOptions = {
  min: 1 ,
  max: 60 * 60,
  lastMode: 'session',
  session: 25 * 60,
  break: 5 * 60,
  long: 15 * 60,
  rounds: 0,
  cycles: 4,
  autoplay: false,
}
const POMODORO_MODES: TPomodoroMode[] = ['session', 'break', 'long'];




function PomodoroApp() {
  const [ options, setOptions ] = useState<TPomodoroOptions>(ls.get(POMODORO_STORAGE_KEY, DEFAULTS));
  const [ mode, setMode ] = useState<TPomodoroMode>('session');
  const [ isRunning, setIsRunning ] = useState(false);
  const [ remaining, setRemaining ] = useState( options[mode] );
  const startBeepRef = useRef<HTMLAudioElement | null>(null);
  const beepRef = useRef<HTMLAudioElement | null>(null);
  
  //handelModeChange vs useEffect(alles automatisch reagieren, methoden in unseren KindKomponente stehen.)
  const countdown = () => {
        if (remaining === 0) {
          
          if (!options.autoplay) {
            handleTimeOver();
          }
        } else {        
            setRemaining((r) => r-1);
        }
    }


  useInterval(countdown, isRunning ? 1000 : null);

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
      if (prev.lastMode === 'session') {
        if (nextRound % 2 === 0) {
          nextMode = 'long';
        } else {
          nextMode = 'break';
        }
      };

      const newState = { ...prev, lastMode: nextMode, rounds: prev.rounds + 1 };
      ls.set(POMODORO_STORAGE_KEY, newState);
      return newState;
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
    setOptions(DEFAULTS);
    setRemaining(DEFAULTS['session']);
    setIsRunning(false);
    setMode('session');
    ls.remove(POMODORO_STORAGE_KEY);
  }

  //useEffect > Play start beep if it is the first time play button is pressed.
  useEffect(() => {
    const startBeep = startBeepRef.current;
    if (!startBeep) { console.log('no startBeepRef found'); return;};
    if (isRunning && remaining === options[mode]) {
      startBeep.play();
    }
    //Clean up
    return () => {
      startBeep.pause();
      startBeep.currentTime = 0;
    }
    }, [isRunning])
    //useEffect > Wenn mode sich wechseln, dann setIsRunning if autoplay is true && setRemaining
    useEffect(() => {
      if (!options.autoplay) {
        setIsRunning(false);
      }
      setMode(mode);
      setRemaining(options[mode]);
      setOptions((prev) => {ls.set(POMODORO_STORAGE_KEY, { ...prev, lastMode: mode }); return ({ ...prev, lastMode: mode })});
      
    }, [mode]);
  return (
      <div className="container w-100 h-100 bg-1 d-flex justify-content-center align-items-center position-relative">
          <audio className="opacity-0 position-absolute" src={startBeep} id="start-beep" ref={startBeepRef}></audio>
          <audio className="opacity-0 position-absolute" src={beep} id="beep" ref={beepRef}></audio>
          <div className="pomodoro-wrapper container-sm border border-width-2 bg-2 py-3 px-2">
            <div className="row">
              <div className="d-flex justify-content-center align-items-center gap-2">
                {POMODORO_MODES.map((pomodoroMode) => <ModeButton key={pomodoroMode} targetMode={pomodoroMode} currentMode={mode} setMode={setMode}></ModeButton>
                )}
              </div>
            </div>
            <div className="row my-2">
                <h1 className="text-center text-body-primary">{parseTime(remaining)}</h1>
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
                {POMODORO_MODES.map((pomodoroMode) => <ChangeTime min={options.min} max={options.max} isRunning={isRunning} modeTime={options[pomodoroMode]} targetMode={pomodoroMode} setOptions={setOptions} setRemaining={setRemaining} ></ChangeTime>)}
              </div>
            </div>
          </div>
      </div>
  )
}

export default PomodoroApp;
