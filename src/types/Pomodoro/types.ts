export type TPomodoroOptions = {
    mode: TPomodoroMode,
    work: number,
    break: number,
    long: number,
    rounds: number,
    cycles: number,
    autoplay: boolean,
}
export type TPomodoroMode = 'work' | 'break' | 'long';