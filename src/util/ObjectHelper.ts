
type ObjectValue<T = any> = Record<string, T>
export default class ObjectHelper {
  deepClone() {

  }
  
  static exclude(value: ObjectValue, predict: (key: string, value: any) => boolean) {
    return Object.keys(value).reduce<ObjectValue>((result, current) => {
      if (predict(current, value[current])) {
        return {
          ...result,
          [current]: value[current]
        }
      }
      return result
    }, {})
  }
}