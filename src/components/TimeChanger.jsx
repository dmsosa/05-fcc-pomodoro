import { FaArrowDown, FaArrowUp, FaPause, FaPlay } from 'react-icons/fa';
import { parseTime } from '../helper/helper';
export function TimeChanger( { timeName, timeToChange, setTimeToChange }) {
    
    const label = timeName === 'break-time' ? 'Break time' : 'Session time';
    const id = timeName === 'break-time' ? 'break-length' : 'session-length';
  return (
    <div className="d-flex justify-content-center align-items-center">
        <button id='decrement' onClick={() => {
            setTimeToChange(((timeToChange / 60) - 1) * 60)
        }}><FaArrowDown/></button>
        <div>
            <h3 id={id}>{parseTime(timeToChange)}</h3>
            <span>{label}</span>
        </div>
        <button id='increment' onClick={() => {
            setTimeToChange(((timeToChange / 60) + 1) * 60)
        }}><FaArrowUp/></button>
    </div>
  );
}
