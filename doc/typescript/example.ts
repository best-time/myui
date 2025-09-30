// ------------------------------------ ex1

type FunctionInfo<T> = T extends (first: infer A, second: infer B) => infer R ? { args: [A, B]; return: R } : never

type LoginFunction = (username: string, password: string) => Promise<boolean>

type LoginInfo = FunctionInfo<LoginFunction> // { args: [string, string]; return: Promise<boolean> }

// ------------------------------------ex2
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

class UserService {
  id: number = 1
  name: string = 'John'
  save(): void {}
  delete(): void {}
}

// 去除函数类型的属性
type UserData = NonFunctionProperties<UserService> // { id: number; name: string }

// ------------------------------------ ex3
// 我们的 action 类型们
type LoginAction = { type: 'LOGIN'; payload: { username: string; password: string } }
type LogoutAction = { type: 'LOGOUT'; payload: null }
type UpdateProfileAction = { type: 'UPDATE_PROFILE'; payload: { name: string; email: string } }

type Actions = LoginAction | LogoutAction | UpdateProfileAction

// 为特定的 action 提取 payload 类型
type PayloadOf<T, ActionType extends string> = T extends { type: ActionType; payload: infer P } ? P : never

// 用法
type LoginPayload = PayloadOf<Actions, 'LOGIN'> // { username: string; password: string }

type LogoutPayload = PayloadOf<Actions, 'LOGOUT'> //  null

type UpdatePayload = PayloadOf<Actions, 'UPDATE_PROFILE'> //  { name: string; email: string }
