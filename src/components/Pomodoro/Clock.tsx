import {  type Dispatch, type RefObject, type SetStateAction } from "react";
import {  parseTime } from "../../helpers";
import { useInterval } from "../../hooks";
import type { TPomodoroMode, TPomodoroOptions } from "../../types/Pomodoro/types";

export default function Clock({ options, mode, remaining, setRemaining, isRunning, handleTimeOver, alarmRef } : { options: TPomodoroOptions, mode: TPomodoroMode, remaining: number, setRemaining: Dispatch<SetStateAction<number>>, isRunning: boolean, handleTimeOver: () => void, alarmRef: RefObject<HTMLAudioElement | null> }) {
    
    
    const playAlarm = () => {
    const alarm = alarmRef.current;
    if (!alarm) return;
        alarm && alarm.play();
    }

    const countdown = () => {
        if (remaining === 0) {
        handleTimeOver();
        } else {
            if (remaining === options[mode]) {
                playAlarm();
            }
            setRemaining((r) => r-1);
        }
    }
    useInterval(countdown, isRunning ? 1000 : null);


  return (
    <h1 className="text-center text-body-primary">{parseTime(remaining)}</h1>
  )
}

