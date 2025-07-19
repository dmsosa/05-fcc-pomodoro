import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
export function TimeChanger( 
    {   
        changeFor,
        displayState,
        setDisplayState,
        timeToChange, //BREAK oder SESSION 
        setTimeToChange, //setBreak oder setSession 
    }) {
    
    const { mode, play } = displayState;

    const label = changeFor === 'break' ? 'Break time' : 'Session time';
    const id = changeFor === 'break' ? 'break-length' : 'session-length';
    const spanId = changeFor === 'break' ? 'break-label' : 'session-label';
    const decrementId = changeFor === 'break' ? 'break-decrement' : 'session-decrement';
    const incrementId = changeFor === 'break' ? 'break-increment' : 'session-increment';

    const onCurrentMode = changeFor === mode;
    const MIN_VALUE = 60;
    const MAX_VALUE = 60 * 60;

    const handleChange = (e) => {
        const btn = e.currentTarget;
        const action = btn.dataset.action;

        if (play) return;
        switch (action) {
            case 'decrement': { 
                if (timeToChange <= MIN_VALUE) return; 
                setTimeToChange(timeToChange - 60);
                if (onCurrentMode) {
                    setDisplayState((prev) => ({ ...prev, displayTime: timeToChange - 60, play: false}));
                };
                break;
            };
            case 'increment': {
                if (timeToChange >= MAX_VALUE) return; 
                setTimeToChange(timeToChange + 60);
                if (onCurrentMode) {
                    setDisplayState((prev) => ({ ...prev, displayTime: timeToChange + 60, play: false}));
                };
            break;
            };
        };
    }
  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
        <button className='btn btn-primary fs-6 p-1 py-0' id={decrementId} data-action="decrement" onClick={handleChange}><FaArrowDown/></button>
        <div>
            <h3 className='text-center mb-0' id={id}>{timeToChange / 60}</h3>
            <span id={spanId}>{label}</span>
        </div>
        <button className='btn btn-primary fs-6 p-1 py-0' id={incrementId} data-action="increment" onClick={handleChange}><FaArrowUp/></button>
    </div>
  );
}
