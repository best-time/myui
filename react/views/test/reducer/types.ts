export interface ITask {
  id: number
  text: string
  done: boolean
}

export interface IAction {
  type: string
  id: number
  task: ITask
  text: string
}
