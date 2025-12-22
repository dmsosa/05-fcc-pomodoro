export type TPomodoroOptions = {
    min: number,
    max: number,
    mode: TPomodoroMode,
    session: number,
    break: number,
    long: number,
    rounds: number,
    cycles: number,
    autoplay: boolean,
}
export type TPomodoroMode = 'session' | 'break' | 'long';