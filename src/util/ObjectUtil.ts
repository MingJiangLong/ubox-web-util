type ObjectDes<T = any> = Record<string, T>
/**
 * Object排除一些值,当predict为true
 */
function excludeItems(value: ObjectDes, predict: (value: any) => boolean) {
  return Object.keys(value).reduce((result, current) => {
    const temp = value[current];
    const predictResult = predict(temp);
    if (predictResult) return result;
    return {
      ...result,
      [current]: temp
    }
  }, {})
}
function pickItems<T = any>(value: ObjectDes, keys: string[]) {
  return Object.keys(keys).reduce((result, key) => {
    return {
      ...result,
      [key]: value[key]
    }
  }, {}) as T
}

export const ObjectUtil = {
  excludeItems, pickItems
}
