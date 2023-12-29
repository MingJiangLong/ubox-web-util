import { isThenable, isString, isFunction } from "./Check";

type FnReturn = void | string
type Fn = (() => Promise<FnReturn>) | (() => FnReturn)

declare global {
  interface Window {
    __HANDLE_HELPER__: {
      handleErrorFn: (error: any) => void
      handleSuccessFn: (message: string) => void
    }
  }
}

/**
 * 用于处理错误处理
 * @example
 * // 统一设置Helper成功处理函数
 * HandleHelper.useSuccessHandle((message: string) => {
 *   // 成功消息处理
 * })
 * // 统一设置Helper错误处理函数
 * HandleHelper.useErrorHandle((error) => {
 * // 错误消息处理
 * })

 * HandleHelper.handle(() => {
 * // 待执行函数
 * })
 */
export class HandleHelper {
  private static handleErrorFn?: (error: any) => void
  private static handleSuccessFn?: (message: string) => void
  static disableLog?: boolean

  static handle(fn: Fn, finallyFn?: () => void) {
    let handleSuccessTemp = HandleHelper.getHandleSuccessFn()
    let handleErrorTemp = HandleHelper.getHandleErrorFn()
    try {
      const result = fn();
      if (isThenable(result)) {
        result.then(
          (message) => {
            if (isString(message)) {
              if (isFunction(handleSuccessTemp)) {
                return handleSuccessTemp(message)
              }

              if (!HandleHelper.disableLog) {
                console.warn(`HandleHelper:成功消息[${result}]未被处理`)
              }
            }
          },
          (error) => {
            if (isFunction(handleErrorTemp)) {
              return handleErrorTemp(error)
            }
            return Promise.reject(error)
          }).finally(
            () => {
              if (isFunction(finallyFn)) {
                finallyFn()
              }
            })
      }

      if (isString(result)) {
        if (isFunction(handleSuccessTemp)) {
          return handleSuccessTemp(result);
        }

        if (!HandleHelper.disableLog) {
          console.warn(`HandleHelper:成功消息[${result}]未被处理`)
        }
      }
    } catch (error) {
      if (isFunction(handleErrorTemp)) {
        return handleErrorTemp(error)
      }
      throw error;
    } finally {
      if (isFunction(finallyFn)) {
        finallyFn()
      }
    }
  }

  static useSuccessHandle(fn: (message: string) => void) {

    this.handleSuccessFn = fn
    if (window && window.__HANDLE_HELPER__) {
      window.__HANDLE_HELPER__ = {
        ...window.__HANDLE_HELPER__,
        handleSuccessFn: (message: string) => fn(message)
      }
    }
  }

  static useErrorHandle(fn: (error: any) => void) {
    this.handleErrorFn = fn
    if (window && window.__HANDLE_HELPER__) {
      window.__HANDLE_HELPER__ = {
        ...window.__HANDLE_HELPER__,
        handleErrorFn: (error: any) => fn(error)
      }
    }
  }


  private static getHandleSuccessFn() {
    return HandleHelper.handleSuccessFn || window?.__HANDLE_HELPER__?.handleSuccessFn
  }
  private static getHandleErrorFn() {
    return HandleHelper.handleErrorFn || window?.__HANDLE_HELPER__?.handleErrorFn
  }
}



