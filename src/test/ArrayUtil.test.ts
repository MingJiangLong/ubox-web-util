import { findItem, countItemOccurrences, findItemNthOccurrenceIndex } from '../util/ArrayUtil'

describe('ArrayUtil', () => {

  let testData = [{ name: 'hello2' }, { name: 'hello' }, { name: 'hello3' }, { name: 'hello' }]
  test('count元素出现次数', () => {
    expect(
      countItemOccurrences(testData, (item) => {
        return item?.name == 'hello'
      }).times
    ).toBe(2)
  })
  test('查找元素第1次出现位置', () => {
    expect(
      findItemNthOccurrenceIndex(testData, (item) => {
        return item?.name == 'hello'
      }, 1).index
    ).toBe(1)
  }, 1)
  test('查找元素第2次出现位置', () => {
    expect(
      findItemNthOccurrenceIndex(testData, (item) => {
        return item?.name == 'hello'
      }, 2).index
    ).toBe(3)
  }, 1)
  test('查找元素第3次出现位置', () => {
    expect(
      findItemNthOccurrenceIndex(testData, (item) => {
        return item?.name == 'hello'
      }, 3)?.index
    ).toBe(undefined)
  }, 1)
  test('查找元素最后一次出现位置', () => {
    expect(
      findItemNthOccurrenceIndex(testData, (item) => {
        return item?.name == 'hello'
      }, -1).index
    ).toBe(3)
  })
  test('查找元素倒数第二次出现位置', () => {
    expect(
      findItemNthOccurrenceIndex(testData, (item) => {
        return item?.name == 'hello'
      }, -2).index
    ).toBe(1)
  })
})