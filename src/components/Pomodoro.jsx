import * as React from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';

export function Pomodoro() {
    const [ mode, setMode ] = React.useState('session');
    const [ breakTime, setBreakTime ] = React.useState(5 * 60);
    const [ sessionTime, setSessionTime ] = React.useState(25 * 60);
    const [ currentTime, setCurrentTime ] = React.useState(25 * 60);
    const [ play, setPlay ] = React.useState(false);

    React.useEffect(() => {
      let timeout;
      if (play) {
        timeout = setTimeout(() => {
          setCurrentTime((prev) => {
            if (prev === 1) {
              handleTimeEnd();
              return 0;
            } else {
              return prev - 1;
            }
          })
        }, 1000);
      }
      return () => clearInterval(timeout);
    }, [play])

    const togglePlay = () => {
      setPlay(!play);
    }
    const handleRefresh = () => {
      setPlay(!play);
      setBreakTime(5 * 60);
      setSessionTime(25 * 60);
      setCurrentTime(25 * 60);
      setMode('session');
    }
    const handleTimeChange = (e) => {
      const name = e.currentTarget.name;
      const value = e.currentTarget.value;
      name === 'break-length' ? setBreakTime(value) : setSessionTime(value);
    }
    const handleTimeEnd = () => {
      setPlay(false);
      if (mode === 'break') {
        setMode('session');
        setCurrentTime(sessionTime);
      } else {
        setMode('break');
        setCurrentTime(breakTime);
      }
    }
    const parseTime = () => {
      const min = Math.floor(currentTime / 60).toString().padStart(2, '0');
      const sec = (currentTime % 60).toString().padStart(2, '0');
      return `${min}:${sec}`;
    }
  return (
    <div id='pomodoro' className='container mw-550'>
      <div id="clock">
        <h1>{parseTime()}</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button onClick={togglePlay}>
          { play ? <FaPause/>:<FaPlay/>}
        </button>
        <button onClick={handleRefresh}>
          <IoMdRefresh/>
        </button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <input type="number" name="break-length" id="break-length"  min={5} max={20} value={breakTime}/>
          <label htmlFor="break-length">break time</label>
        </div>
        <div>
          <input type="number" name="session-length" id="session-length"  min={15} max={60} value={sessionTime} onChange={handleTimeChange}/>
          <label htmlFor="session-length">session time</label>
        </div>
      </div>
    </div>
  );
}
