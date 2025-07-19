

export function ModeToggler({ modes, setMode, setCurrentTime, breakTime, sessionTime }) {
    const handleClick = (mode) => {
        if (mode === 'break') {
            setCurrentTime(breakTime);
        } else {
            setCurrentTime(sessionTime);
        }
        setMode(mode);
    }
  return (

        <ul className="ul-link">
          {modes.map((mode) => (
            <button className="btn btn-primary"  onClick={() => handleClick(mode)}>
                <a className='text-decoration-none' >{mode}</a>
            </button>))}
        </ul>
        
  );
}
