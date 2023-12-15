import { isStandardBrowserEnv } from "./Check";

export class URLHash {
  static use?: (hash: string) => string

  /**
   * 获取当前url的hash字符串
   */
  static hash() {
    if (!isStandardBrowserEnv()) throw new Error("URLHash只支持浏览器环境调用");

    let hash = window.location.hash;
    if (this.use) {
      return this.use(hash)
    }
    return hash;
  }

  /**
   * 获取当前hash部分路由参数字符串
   * @returns 
   */
  static getHashStr() {
    const [, valueStr] = this.hash().split('?');
    if (valueStr === undefined) return '';
    return valueStr
  }

  /**
   * 获取当前hash部分路由参数对象
   * @returns 
   */
  static getHashObject() {
    let valueStr = this.getHashStr();
    return valueStr.split("&").reduce<{ [k: string]: string }>((count, current) => {
      let [key, value] = current.split("=")
      return {
        ...count,
        [key]: value
      }
    }, {})
  }

  /**
   * 获取路由参数
   * @param hashKey 
   * @returns 
   */
  static getValueByKey(hashKey: string) {
    let valueObj = this.getHashObject()
    return valueObj[hashKey];
  }

  static getKeyByValue(value: string) {
    let valueObj = this.getHashObject();
    for (const key in valueObj) {
      if (Object.prototype.hasOwnProperty.call(valueObj, key)) {
        const valueInHash = valueObj[key];
        if (valueInHash == value) return key
      }
    }
  }
}

