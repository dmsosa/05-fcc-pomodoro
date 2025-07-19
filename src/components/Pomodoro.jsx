import * as React from 'react';
import { FaArrowRight, FaPause, FaPlay } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import beginSound from '../assets/timer-begin-sound.mp3';
import endSound from '../assets/timer-end-sound.mp3';
import { parseTime } from '../helper/helper';
import { TimeChanger } from './TimeChanger';
import { ModeToggler } from './ModeToggler';

export function Pomodoro() {

    // ERSTE STATE: { Session Mode, 5 min Break, Play is Falsch, 25 min Session, 25 displayZeit,  }

    const [ breakTime, setBreakTime ] = React.useState(5 * 60);
    const [ sessionTime, setSessionTime ] = React.useState(25 * 60);
    const [ displayState, setDisplayState ] = React.useState({ mode: 'session', displayTime: 25 * 60, play: false})

    const { mode, displayTime, play } = displayState;
    const lessThanOneMinute = displayTime < 60;

    React.useEffect(() => {
      let timeout;
      if (play) {
        timeout = setTimeout(() => {
          setDisplayState((prevState) => {

            const prevTime = prevState.displayTime;
            if (prevTime === 1) {
              handleTimeEnd();
            };
            return ({...prevState, displayTime: prevTime - 1});
          });
        }, 1000);
      } else 
      return () => clearInterval(timeout);
    }, [displayState])

    const togglePlay = () => {
      if (displayTime === sessionTime || displayTime === breakTime ) {
        playSound('start');
      };
      setDisplayState((prev) => ({ ...prev, play: !play}));
    }
    const handleTimeEnd = () => {
      switch (mode) {
        case 'break': {
          setDisplayState({ mode: 'session', displayTime: breakTime, play: false});
          break;
        };
        case 'session': {
          setDisplayState({ mode: 'session', displayTime: breakTime, play: false});
          break;
        };
      }
      playSound('end');
    }
    const playSound = (name) => {
        switch (name) {
        case 'start': {
          const sound = document.getElementById('start-beep');
          sound.play();
          break;
        };
        case 'end': {
          const sound = document.getElementById('beep');
          sound.play();
          break;
        };
      }
    }
    const handleRefresh = () => {
      setDisplayState({ mode: 'session', displayTime: 25 * 60, play: false});
      setBreakTime(5 * 60);
      setSessionTime(25 * 60);
    }
    const handleNextMode = () => {
      switch (mode) {
        case 'break': {
          setDisplayState({ mode: 'session', displayTime: sessionTime, play: false});
          break;
        };
        case 'session': {
          setDisplayState({ mode: 'break', displayTime: breakTime, play: false});
          break;
        };
      }
    }

  return (
    <div id='pomodoro' className='container mw-550'>
      <div id="clock" className='box'>
        {/* //ModeToggler */}
        <ModeToggler modes={['break', 'session']} setDisplayState={setDisplayState} breakTime={breakTime} sessionTime={sessionTime}/>

        {/* //Titel */}
        <div className={`text-center ${lessThanOneMinute ? 'text-danger' : 'text-highlight'} my-2`}>
          <h4 className='h4 text-uppercase' id='timer-label'>{mode}</h4>
          <h1 className='h1' id='time-left'>{parseTime(displayTime)}</h1>
        </div>


        {/* //Optionen */}
        <div className="d-flex justify-content-center align-items-center gap-3">
          <button id='refresh' className='btn btn-primary fs-5' onClick={handleRefresh}>
            <IoMdRefresh/>
          </button>
          <button id='start_stop' onClick={togglePlay} className='btn btn-primary fs-5'>
            { play ? 
            <><span className='me-2'>pause</span><FaPause/></>
            :
            <><span className='me-2'>play</span><FaPlay/></>
            }
          </button>
          <button className='btn btn-primary fs-5' onClick={() => handleNextMode()}><FaArrowRight/></button>
        </div>

      </div>
      
      <div className="d-flex justify-content-center align-items-center position-relative bg-3 gap-4">
        <audio id='start-beep' src={beginSound}></audio>
        <audio id='beep' src={endSound}></audio>
        <TimeChanger changeFor={'break'} displayState={displayState} setDisplayState={setDisplayState} timeToChange={breakTime} setTimeToChange={setBreakTime}  />
        <TimeChanger changeFor={'session'} displayState={displayState} setDisplayState={setDisplayState} timeToChange={sessionTime} setTimeToChange={setSessionTime} />
      </div>
    </div>
  );
}
