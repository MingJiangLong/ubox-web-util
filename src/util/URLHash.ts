export class URLHash {
  static use?: (hash: string) => string

  /**
   * 获取当前url的hash字符串
   */
  static hash() {
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
  static pathParamStr() {
    const [, valueStr] = this.hash().split('?');
    if (valueStr === undefined) return '';
    return valueStr
  }

  /**
   * 获取当前hash部分路由参数对象
   * @returns 
   */
  static pathParamObj() {
    let valueStr = this.pathParamStr();
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
    let valueObj = this.pathParamObj()
    return valueObj[hashKey];
  }

  static getKeyByValue(value: string) {
    let valueObj = this.pathParamObj();
    for (const key in valueObj) {
      if (Object.prototype.hasOwnProperty.call(valueObj, key)) {
        const valueInHash = valueObj[key];
        if (valueInHash == value) return key
      }
    }
  }
}

