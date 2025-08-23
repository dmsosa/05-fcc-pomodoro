export default function ModeButton({ target, mode, handler }) {

  return (
    <button className={`btn ${mode === target ? 'btn-primary':'btn-secondary'}`} onClick={handler} data-target='break'>{target.toUpperCase()}</button>
  )
}

