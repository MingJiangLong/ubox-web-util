import { findItem, countItemOccurrences } from '../util/ArrayUtil'

describe('ArrayUtil', () => {

  test('count元素出现次数', () => {
    let testData = [{ name: 'hello2' }, { name: 'hello' }, { name: 'hello3' }, { name: 'hello' }]
    expect(
      countItemOccurrences(testData, (item) => {
        return item?.name == 'hello'
      }).times
    ).toBe(2)
  })
})