import ErrorHandle from "./ErrorHandle";
import { isFunction } from "./Check";
/**
 * 异常捕获
 * 如果要用设置全局自动捕获调用 `ErrorHandle.updateHandleFn`设置默认捕获函数
 * @param fn 
 * @param finallyHandle 
 * @param errorHandle 
 * @returns 
 */
export default async function handleError(fn: Fn, finallyHandle?: Finally, errorHandle?: (error: any) => void) {
  try {
    await fn();
  } catch (error: any) {
    if (isFunction(errorHandle)) {
      return errorHandle(error)
    }
    if (isFunction(ErrorHandle.handle)) {
      console.log("异常已被handleError处理", error)
      return ErrorHandle.handle(error)
    }
    throw error;
  } finally {
    if (isFunction(finallyHandle)) {
      finallyHandle()
    }
  }
}

type Finally = () => void
type Fn = () => (Promise<any>) | any