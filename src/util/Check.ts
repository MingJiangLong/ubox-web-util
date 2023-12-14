export const typeOfValue = (type: string) => (value: any) => typeof value == type

export function isStandardBrowserEnv() {
  return window && document
}
export function isFunction(value: any): value is Function {
  return typeOfValue('function')(value)
}

export function isNumber(value: any): value is number {
  return typeOfValue('number')(value)
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}