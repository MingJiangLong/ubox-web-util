import { isThenable, isString, isFunction } from "./Check";

type FnReturn = void | string
type Fn = (() => Promise<FnReturn>) | (() => FnReturn)

declare global {
  interface Window {
    __HANDLE_HELPER__: {
      errorCallback: (error: any) => void
      successCallback: (message: string) => void
    }
  }
}


/**
 * 用于处理错误处理
 */
export class HandleHelper {
  private static errorCallback?: (error: any) => void
  private static successCallback?: (message: string) => void
  static showLog?: boolean = true

  static handle(
    fn: Fn,
    callback: {
      successCallback?: (message: string) => void
      errorCallback?: (error: any) => void
      finallyCallback?: () => void
    }
  ) {
    let successCallbackFn = callback?.successCallback ?? this.getDefaultSuccessCallback
    let errorCallbackFn = callback?.errorCallback ?? this.getDefaultErrorCallback
    let finallyCallback = callback?.finallyCallback ?? (() => { })
    let isSyncCallback = true; // 标记是否是同步函数
    try {
      const result = fn();
      if (isThenable(result)) {
        isSyncCallback = false
        result.then(
          (message) => {
            if (isString(message)) {
              successCallbackFn(message)
              if (HandleHelper.showLog) {
                console.warn(`HandleHelper:成功消息[${message}]`)
              }
            }
          },
          (error) => {
            if (HandleHelper.showLog) {
              console.warn(`HandleHelper:失败消息[${error}]`)
            }
            errorCallbackFn(error)
          }).finally(
            () => {
              finallyCallback()
            })
      }

      if (isString(result)) {
        if (HandleHelper.showLog) {
          console.warn(`HandleHelper:成功消息[${result}]`)
        }
        return successCallbackFn(result);
      }
    } catch (error) {
      if (HandleHelper.showLog) {
        console.warn(`HandleHelper:失败消息[${error}]`)
      }
      return errorCallbackFn(error)
    } finally {
      if (isSyncCallback) {
        finallyCallback()
      }
    }
  }


  static updateSuccessCallback(callback: (message: string) => void, syncWithWindow = true) {
    let temp = (message: string) => { };
    if (isFunction(callback)) {
      temp = callback
    }
    this.successCallback = temp;

    if (syncWithWindow) {
      window.__HANDLE_HELPER__ = {
        ...window.__HANDLE_HELPER__,
        successCallback: (message: string) => temp(message)
      }
    }

  }

  static updateErrorCallback(callback: (error: any) => void, syncWithWindow = true) {
    let temp = (error: any) => { };
    if (isFunction(callback)) {
      temp = callback
    }
    this.errorCallback = temp;

    if (syncWithWindow) {
      window.__HANDLE_HELPER__ = {
        ...window.__HANDLE_HELPER__,
        errorCallback: (error: any) => temp(error)
      }
    }
  }




  private static getDefaultSuccessCallback() {
    return HandleHelper.successCallback || window?.__HANDLE_HELPER__?.successCallback || ((message: string) => { })
  }
  private static getDefaultErrorCallback() {
    return HandleHelper.errorCallback || window?.__HANDLE_HELPER__?.errorCallback || ((error: any) => { })
  }
}



