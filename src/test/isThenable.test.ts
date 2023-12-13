import isThenable from "../util/isThenable";

describe('测试', () => {
  test('isThenable', () => {
    expect(isThenable(() => { })).toBe(false);
  });
  test('isThenable', () => {
    expect(isThenable((async() => { })())).toBe(true);
  });
})