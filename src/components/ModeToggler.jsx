

export function ModeToggler({ modes, setDisplayState, breakTime, sessionTime }) {
    const handleClick = (mode) => {
    switch (mode) {
        case 'break': {
          setDisplayState({ mode: 'break', displayTime: breakTime, play: false});
          break;
        };
        case 'session': {
          setDisplayState({ mode: 'session', displayTime: sessionTime, play: false});
          break;
        };
      }
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
