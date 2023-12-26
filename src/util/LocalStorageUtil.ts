import { isArray } from "./Check";

const INFINITY = 'Infinity'
type ListenerType =
  | 'onClear'
  | 'onSetItem'
  | 'onRemoveItem'
  | "onDateExpiredWhenGet"
  | "onKeyNotExist"
  | "onError"

type ListenerInfo = {
  id: string
  callback: (...args: any) => void
}

type ListenerStore = {
  [k in ListenerType]: ListenerInfo[]
}
/**
 * web缓存工具; <br/>
 * 增加数据分区; <br/>
 * 增加数据过期能力; <br/>
 * 增加监听事件;<br/>
 * 不应该存入任何为`undefined`的数据<br/>
 * 
 * @example
 * // 初始化工具并设置scope
 * const localStorageUtil = new LocalStorageUtil('home_page');
 * 
 * // 设置数据，此数据不会过期
 * localStorageUtil.setItem("name","张三") 
 * 
 * // 设置数据 并添加6s过期时间
 * localStorageUtil.setItem("money","9000",1000*6)
 * 
 * // 移除当前scope(home_page)下的name
 * localStorageUtil.removeItem("name") 
 * 
 * // 移除home_page下所有的记录
 * localStorageUtil.clear() 
 * 
 * // 获取当前scopes(home_page)下所有key
 * localStorageUtil.keys()
 * 
 * // 监听onDateExpiredWhenGet onDateExpiredWhenGet可以多次注册
 * // 可监听的事件 onSetItem | onRemoveItem | onClear | onDateExpiredWhenGet | onKeyNotExist | onError
 * const listener = localStorageUtil.addListener("onDateExpiredWhenGet",(...args)=>{
 *    // 获取数据时，数据过期
 * })
 * 
 * // 移除当前注册的监听器
 * listener.remove();
 * 
 * // 移除注册监听onDateExpiredWhenGet的所有监听器
 * localStorageUtil.removeListener("onDateExpiredWhenGet")
 * 
 * // 移除所有的监听器
 * localStorageUtil.removeAllListener()
 * 
 * // 移除当前scope下过期的数据
 * localStorageUtil.clearExpiredData()
 */
export class LocalStorageUtil {

  private scope: string;

  constructor(scope: string) {
    this.scope = `__${scope}__`
  }

  private listeners: ListenerStore = {
    "onSetItem": [],
    "onRemoveItem": [],
    "onClear": [],
    "onDateExpiredWhenGet": [],
    "onKeyNotExist": [],
    "onError": [],
  }

  getItem<T>(key: string): T | null {
    try {
      const result = localStorage.getItem(this.getKey(key));
      if (!result) {
        this.runCallback("onKeyNotExist", key)
        return null
      };

      const parsedResult = JSON.parse(result);

      if (!isArray(parsedResult) || parsedResult.length != 2) {
        this.runCallback("onError", result)
        return null
      };

      let [data, expired] = parsedResult;
      if (expired === INFINITY) return data;

      const now = Date.now();
      if (now < expired) return data;

      this.runCallback("onDateExpiredWhenGet", {
        key,
        data,
        expired
      })
      return null;
    } catch (error) {
      this.runCallback("onError", key, error)
      return null
    }
  }
  setItem(key: string, value: any, expired?: number) {
    try {
      const now = Date.now()
      const latestKeys = this.getKey(key);
      const data = [value, expired ? now + expired : INFINITY]
      localStorage.setItem(latestKeys, JSON.stringify(data))
      this.runCallback('onSetItem', { key, value })
    } catch (error) {
      this.runCallback("onError", {
        key, value
      }, error)
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(this.getKey(key))
    this.runCallback('onRemoveItem', key)
  }

  keys() {
    return this.getKeysInScope().map(item => item.replace(this.scope, ''))
  }

  clear() {
    const keys = this.getKeysInScope()
    keys.forEach(key => localStorage.removeItem(key))
    this.runCallback("onRemoveItem", keys.map(key => key.replace(this.scope, '')))
  }

  clearExpiredData() {
    const keys = this.getKeysInScope();
    const now = Date.now()
    keys.forEach(key => {
      const result = localStorage.getItem(key);
      if (!result) return;
      const [expired] = JSON.parse(result);
      if (expired != INFINITY && expired < now) {
        localStorage.removeItem(key)
      }
    })
  }

  private runCallback(key: ListenerType, ...args: any[]) {
    this.listeners[key].forEach(item => item.callback(...args))
  }

  private genId() {
    const prefix = Math.random().toString(36);
    const now = Date.now();
    return `${prefix}_${now}`
  }

  addListener(type: ListenerType, callback: () => void) {
    let listener = this.listeners[type];
    if (!isArray(listener)) throw new Error("监听事件无效");
    const id = this.genId();
    listener.push({
      id,
      callback
    })

    return {
      remove: () => {
        this.listeners[type] = this.listeners[type].filter(item => item.id != id)
      }
    }
  }

  removeListener(type: ListenerType) {
    if (type in this.listeners) {
      this.listeners[type] = []
    }
  }

  removeAllListener() {
    Object.keys(this.listeners).forEach(key => {
      // @ts-ignore
      this.listeners[key] = []
    })
  }

  private getKey(key: string) {
    return `${this.scope}${key}`;
  }

  private getKeysInScope() {
    let count = localStorage.length;
    let result = [];
    let start = 0;
    while (start < count) {
      const key = localStorage.key(start);
      if (key && key.startsWith(this.scope)) {
        result.push(key);
      }
      start++;
    }
    return result;
  }
}