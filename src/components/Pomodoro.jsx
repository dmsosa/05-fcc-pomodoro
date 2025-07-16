import * as React from 'react';
import { FaArrowRight, FaPause, FaPlay } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import beginSound from '../assets/timer-begin-sound.mp3';
import endSound from '../assets/timer-end-sound.mp3';
import { parseTime } from '../helper/helper';
import { TimeChanger } from './TimeChanger';



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
    }, [play, currentTime])

    const togglePlay = () => {
      if (currentTime === sessionTime || currentTime === breakTime ) {
        playSound();
      }
      setPlay(!play);
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
      playSound();
    }
    const handleRefresh = () => {
      setPlay(false);
      setBreakTime(5 * 60);
      setSessionTime(25 * 60);
      setCurrentTime(25 * 60);
      setMode('session');
    }


    const playSound = () => {
      let sound;
      if (currentTime === sessionTime | currentTime === breakTime) {
        sound = document.getElementById('begin-sound');
      } else {
        sound = document.getElementById('end-sound');
      }
      sound.play();
    }
  return (
    <div id='pomodoro' className='container mw-550'>
      <div id="clock">
        <h1>{parseTime(currentTime)}</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center bg-2">
        <button onClick={togglePlay}>
          { play ? <FaPause/>:<FaPlay/>}
        </button>
        <button onClick={handleRefresh}>
          <IoMdRefresh/>
        </button>
        <button><FaArrowRight/></button>
      </div>
      <div className="d-flex justify-content-center align-items-center position-relative bg-3">
        <audio id='begin-sound' src={beginSound}></audio>
        <audio id='end-sound' src={endSound}></audio>
        <TimeChanger timeName={'break-time'} timeToChange={breakTime} setTimeToChange={setBreakTime} />
        <TimeChanger timeName={'session-time'} timeToChange={sessionTime} setTimeToChange={setSessionTime} />
      </div>
    </div>
  );
}
