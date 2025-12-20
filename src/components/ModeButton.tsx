export default function ModeButton({ target, mode, handler }:{ target: string, mode: string, handler: (e: any) => void }) {

  return (
    <button className={`btn ${mode === target ? 'btn-primary':'btn-secondary'}`} onClick={handler} data-target='break'>{target.toUpperCase()}</button>
  )
}

