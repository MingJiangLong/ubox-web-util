import { HandleHelper } from "../util/HandleHelper"

HandleHelper.useSuccessHandle((message) => {
  console.warn("useSuccessHandle:", message);
})
HandleHelper.useErrorHandle((error) => {
  console.warn("useErrorHandle:", error);
})

// function test() {
//   return new Promise((s, e) => {
//     return s("??????")
//   })
// }

// describe('HandleHelper', () => {

//   // test("同步函数异常捕获测试:", () => {
//   //   expect(
//   //     HandleHelper.handle(() => {
//   //       throw new Error("我是同步错误")
//   //     })
//   //   ).toBe(void 0)
//   // })

//   // test("同步成功消息测试", () => {
//   //   expect(
//   //     HandleHelper.handle(() => {
//   //       return "同步成功消息"
//   //     })
//   //   ).toBe(void 0)
//   // })

//   // test("同步finally消息测试", () => {
//   //   expect(
//   //     HandleHelper.handle(() => {
//   //       return "finally前的成功消息"
//   //     },()=>{console.warn("finally:","最后打印")})
//   //   ).toBe(void 0)
//   // })

//   // test("异步成功消息", () => {
//   //   expect(
//   //     HandleHelper.handle(
//   //       () => {
//   //         return new Promise((s, e) => {
//   //           setTimeout(() => {
//   //             s("异步成功消息")
//   //           }, 3000);
//   //         })
//   //       }
//   //     )
//   //   ).toBe(undefined)
//   // })
//   // test("异步失败消息", () => {
//   //   expect(
//   //     HandleHelper.handle(
//   //       () => {
//   //         return new Promise((s, e) => {
//   //           setTimeout(() => {
//   //             e("异步失败消息")
//   //           }, 3000);
//   //         })
//   //       }
//   //     )
//   //   ).toBe(undefined)
//   // })
// })

async function test() {
  return new Promise((s, e) => {
    setTimeout(() => {
      s("hello")
    }, 3000)
  })
}
async function test2() {
  return new Promise((s, e) => {
    setTimeout(() => {
      e("hello")
    }, 3000)
  })
}

HandleHelper.handle(async () => {
  await test2();
})