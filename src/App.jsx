import { useEffect, useRef, useState } from 'react'
import beep from "./assets/beep.mp3";
import ChangeTime from './components/ChangeTime';
import { FaTruckLoading } from 'react-icons/fa';
import ModeButton from './components/ModeButton';

//HELPERS
// Time formatting helper
export const parseTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const clamp = (n) => Math.min(60 * 60, Math.max(n, 5 * 60));
//
const DEFAULTS = {
  SESSION: 25 * 60,
  BREAK: 5 * 60,
  LONG: 15 * 60,
  CYCLES: 4,
}
const  ls = {
  get: (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (err) {
      return fallback;
    }
  },
  set: (key, val) => {
    try {
      const value = localStorage.setItem(key, JSON.stringify(val));
      return value ? JSON.parse(value) : fallback;
    } catch {
    }
  },
  remove: (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
  }
}
}

function useInterval(cb, d) {
  const callbackRef = useRef();
  useEffect(() => {
    if (!cb) return;
    callbackRef.current = cb;
  }, [cb])
  useEffect(() => {
    if (!d) return;
    const id = setInterval( () => {callbackRef.current && callbackRef.current()}, d);
    return () => clearInterval(id);
  }, [d])
}

function App() {
  const [ settings, setSettings ] = useState(ls.get('pomodoro:settings', DEFAULTS));
  const [ mode, setMode ] = useState('session');
  const [ remaining, setRemaining ] = useState(settings.SESSION);
  const [ running, setRunning ] = useState(false);
  const [ autoplay, setAutoplay ] = useState(false);
  const [ round, setRound ] = useState(1);
  
  const countdown = () => {
    if (remaining === 0) {
      handleFinish();
    } else {
      setRemaining((r) => r-1);
    }
  }
  const makeBeep = () => {
    const audio = document.getElementById('beep');
    audio && audio.play();
  }

  useInterval(countdown, running ? 1000 : null);

  const toggleRun = () => setRunning((r) => !r);


  const handleFinish = () => {
    makeBeep();
    const nextRound = round + 1;
    if (mode === 'session') {
      if (nextRound % settings.CYCLES === 0 ) {
        setMode('long');
        setRemaining(settings.LONG);
      } else {
        setMode('break');
        setRemaining(settings.BREAK);
      }
        setRound(nextRound);
        setRunning(autoplay ? true : false);
    } else {
        setMode('session');
        setRemaining(settings.SESSION);
        setRound(nextRound);
        setRunning(autoplay ? true : false);
    }
  }
  const handleReset = () => {
    setRunning(false);
    setMode('session');
    setRemaining(settings.SESSION);
    const audio = document.getElementById('beep');
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }
  const  handleChangeMode = (e) => {
    const btn = e.currentTarget;
    const target = btn.dataset.target;
    switch (target) {
      case 'break': {
        setMode('break');
        setRemaining(settings.BREAK);
        setRunning(false);
        break;
      };
      case 'long': {
        setMode('long');
        setRemaining(settings.LONG);
        setRunning(false);
        break;
      };
      case 'session': {
        setMode('session');
        setRemaining(settings.SESSION);
        setRunning(false);        
        break;
      };
    }

    const audio = document.getElementById('beep');
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }
  

  return (
    <div id="app-wrapper" className="app-wrapper theme-dark">
      <div className="container w-100 h-100 bg-1 d-flex justify-content-center align-items-center">
          <div className="container-sm border border-width-2 bg-2 py-3 px-2">
            <div className="row">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <ModeButton handler={handleChangeMode} target={'session'} mode={mode}></ModeButton>
                <ModeButton handler={handleChangeMode} target={'break'} mode={mode}></ModeButton>
                <ModeButton handler={handleChangeMode} target={'long'} mode={mode}></ModeButton>
              </div>
            </div>
            <div className="row my-2">
              <h1 id="time-left" className='text-center'>{parseTime(remaining)}</h1>
              <h1 id="timer-label" className='text-center'>{mode.toUpperCase()}</h1>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center">
                <button id="start_stop" className='btn btn-primary' onClick={toggleRun}><h3>{running ? 'PAUSE':'START'}</h3></button>
                <button id="reset" className='btn btn-primary ms-3' onClick={handleReset}><h4><FaTruckLoading/></h4></button>
                <audio src={beep} id="beep"></audio>
              </div>
              <div className="d-flex justify-content-center align-items-center my-3">
                <ChangeTime target={'session'} mode={mode} time={settings.SESSION} setSettings={setSettings} setRemaining={setRemaining}></ChangeTime>
                <ChangeTime target={'break'} mode={mode} time={settings.BREAK} setSettings={setSettings} setRemaining={setRemaining}></ChangeTime>
                <ChangeTime target={'long'} mode={mode} time={settings.LONG} setSettings={setSettings} setRemaining={setRemaining}></ChangeTime>
              </div>
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default App
