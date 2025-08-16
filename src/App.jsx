import { useEffect, useRef, useState } from 'react'
import beep from "./assets/beep.mp3";
import ChangeTime from './components/ChangeTime';

//HELPERS
// Time formatting helper
export const parseTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const clamp = (n) => Math.min(60 * 60, Math.max(n, 0 * 60));
//
const DEFAULTS = {
  SESSION: 25 * 60,
  BREAK: 5 * 60,
  LONG: 25 * 60,
  CYCLES: 5 * 60,
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
  const handleRefresh = () => {
    setRunning(false);
    setMode('session');
    setRemaining(settings.SESSION);
    setCycles(settings.CYCLES);
    const audio = document.getElementById('beep');
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }
  

  return (
    <div id="app-wrapper" className="app-wrapper">
      <h1 id="time-left">{parseTime(remaining)}</h1>
      <h1 id="timer-label">{mode.toUpperCase()}</h1>
      <button id="start_stop" onClick={toggleRun}>{running ? 'PAUSE':'START'}</button>
      <ChangeTime target={'session'} time={settings.SESSION} setSettings={setSettings} setRemaining={setRemaining}></ChangeTime>
      <ChangeTime target={'break'} time={settings.BREAK} setSettings={setSettings} setRemaining={setRemaining}></ChangeTime>
      <button id="reset" onClick={handleRefresh}></button>
      <audio src={beep} id="beep"></audio>
    </div>
  )
}

export default App
