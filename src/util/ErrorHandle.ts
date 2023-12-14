import { isFunction } from "./Check";


/**
 * 全局通用异常处理
 * 调用`updateHandleFn`将会维护一个通用的异常处理函数
 */
export default class ErrorHandle {
  static handle?: HandleFn

  static updateHandleFn(handleFn: HandleFn) {
    if (!isFunction(handleFn)) throw new Error('updateCatchFn params[0] must  be a function')
    this.handle = handleFn;
  }
}


type HandleFn<T = any> = (error: T) => void