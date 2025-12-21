import {  useState } from "react";
import {  parseTime } from "../../helpers";
import { useInterval } from "../../hooks";
import type { TPomodoroMode, TPomodoroOptions } from "../../types/Pomodoro/types";

export default function Clock({ options, mode, isRunning, handleTimeOver } : { options: TPomodoroOptions, mode: TPomodoroMode, isRunning: boolean, handleTimeOver: () => void }) {
    const [ remaining, setRemaining ] = useState( options[mode] );
    

    const countdown = () => {
        if (remaining === 0) {
        handleTimeOver();
        } else {
        setRemaining((r) => r-1);
        }
    }
    console.log('rendered')
    useInterval(countdown, isRunning ? 1000 : null);

  return (
    <h1>{parseTime(remaining)}</h1>
  )
}

