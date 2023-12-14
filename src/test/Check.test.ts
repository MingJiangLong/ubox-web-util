import { isPositiveAndLessThanTwoDecimalNumber } from "../util/Check"

describe("Check工具", () => {

  test("isPositiveAndLessThanTwoDecimalNumber:2 是大于0且小数位不超过2位", () => {
    expect(
      isPositiveAndLessThanTwoDecimalNumber(2)
    ).toBe(true)
  })

  test("isPositiveAndLessThanTwoDecimalNumber:-1 不是大于0且小数位不超过2位", () => {
    expect(
      isPositiveAndLessThanTwoDecimalNumber(-1)).toBe(false)
  })

  test("isPositiveAndLessThanTwoDecimalNumber:0.00 不是大于0且小数位不超过2位", () => {
    expect(
      isPositiveAndLessThanTwoDecimalNumber('0.00')).toBe(false)
  })
  test("isPositiveAndLessThanTwoDecimalNumber:2.2 是大于0且小数位不超过2位", () => {
    expect(
      isPositiveAndLessThanTwoDecimalNumber('2.2')
    ).toBe(true)
  })
  test("isPositiveAndLessThanTwoDecimalNumber:a 不是大于0且小数位不超过2位", () => {
    expect(
      isPositiveAndLessThanTwoDecimalNumber('a')
    ).toBe(false)
  })

})