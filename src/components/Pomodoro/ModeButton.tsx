import type { Dispatch, SetStateAction } from "react"
import type { TPomodoroMode } from "../../types/Pomodoro/types"

// Ziel: 
// 1. mode verwechsel zu targetMode
// 2. wenn mode sich andert, setIsRunning zu falsch 
// 3. dass ird der clock automatish render, aber remainder wird nicht andern 
//FRAGEN
//setMode wurde alle der Pomodoro App wechseln? 
//Ant1: Nein, sondern nur mode state verandern (remainder is gleich)
// if autoplay, das remainder wird automatisch sich setzen?
// nein, ich brauch der Dauerhaft von der options greifen, und dann remainder setzen, aber ohne Running zu verandern.
// aber wenn mein Komponent zu isRunning verbinden ist, warum es geht wieder zu 0?
export default function ModeButton({ targetMode, currentMode, setMode }:{ targetMode: TPomodoroMode, currentMode: TPomodoroMode, setMode: Dispatch<SetStateAction<TPomodoroMode>> }) {

  return (
    <button className={`btn ${currentMode === targetMode ? 'btn-primary':'btn-secondary'}`} onClick={() => 
    setMode(targetMode)} data-target='break'>{targetMode.toUpperCase()}</button>
  )
}

