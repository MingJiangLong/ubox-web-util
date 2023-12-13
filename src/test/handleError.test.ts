import handleError from "../util/handleError"

describe('handleError', () => {

  test('拦截错误', () => {
    expect(
      handleError(() => {
        throw new Error("baocuo");
      }, undefined, () => {
        throw new Error("拦截到信息")
      })
    ).toThrow("拦截到信息")
  })
})