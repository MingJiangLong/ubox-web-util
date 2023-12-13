import { isFunction } from "./isFunction";

export default function isThenable(value: any): value is Promise<any> {
  const type = typeof value;
  return (type === 'object' || isFunction(value)) && (isFunction(value?.then))
}