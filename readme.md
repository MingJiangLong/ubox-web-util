# web-util

- **URLHash**

  ```ts
    location.href = 'http:www.test/#/home?name=jack'
  ```

  - `use`

    ```typescript
      // use会替换掉从location中获取的hash字符串
      URLHash.use((hashStr)=>"?name=jack")
    ```

  - 获取hash: `hash`

    ```typescript
      URLHash.hash();// ?name=jack
    ```

  - 获取hash: `getHashStr`

    ```typescript
      URLHash.getHashStr(); // name=jack
    ```

  - 获取hash对象: `getHashObject`

    ```typescript
      URLHash.getHashObject(); // { name: 'jack'}
    ```

  - 获取value: `getValueByKey`  

    ```typescript
      URLHash.getValueByKey("name"); // jack
    ```

  - 获取key:`getKeyByValue`
  
    ```typescript
      URLHash.getKeyByValue("jack"); // name
    ```

- **Check**

  - 校验小数位不超过2位的正数:`isPositiveAndLessThanTwoDecimalNumber`

- **ArrayUtil**

  - 从数组中连续查找元素: `findItem`

    ```ts
      const data = [1,2,3,1,2,3];

      // 默认从下标0 查找
      const result = findItem(data,(item)=>item == 2) // { index: 1,value: 2,next...}

      // 查找下一个满足条件的
      const result2 = result.next();

      // 可以重新设置满足条件
      const result3 = result2.next((item)=>item == 1)
    ```

  - 查找第N次出现的元素: `findItemNthOccurrenceIndex`

    ```ts
        const data = [1,2,3,1,2,3];
        // 查找第一次出现的信息
        findItemNthOccurrenceIndex(data, (item)=>item == 1, 1) // { index: 0,value: 1}

        // 查找最后一次出现的信息
        findItemNthOccurrenceIndex(data, (item)=>item == 1, -1)// {index: 3,value: 1}
    ```

  - 统计元素出现的次数: `countItemOccurrences`

      ```typescript
        const data = [1,2,3,1,2,3];
        countItemOccurrences(data, (item)=>item == 1) //   { items: [ { index: 0, value: 1 },{ index: 3, value: 1 } ],times: 2}
      
      ```

- **LocalStorageUtil**

  ```txt
    基于localStorage封装，增加了数据过期、事件监听、数据scope等能力
  ```

  - 初始化设置`scope`

    ```ts
      const localStorageUtil = new LocalStorageUtil("home_page")
    ```

  - 设置缓存: `setItem`

    ```tx
      设置缓存，并可以设置过期时间
    ```

    ```ts
      // 不会过期的缓存
      localStorageUtil.setItem("name","jack")

      // 10s过期
      localStorageUtil.setItem("name","jack",1000 * 10)// 

    ```

  - 获取缓存: `getItem`

    ```ts
     localStorageUtil.getItem("name")
    ```

  - 移除单个缓存: `removeItem`

    ```ts
     localStorageUtil.removeItem("name")
    ```

  - 移除`scope`下缓存: `clear`

    ```ts
     localStorageUtil.clear()
    ```

  - 获取`scope`下所有数据key: `keys`

    ```ts
     localStorageUtil.keys()
    ```

  - 添加监听事件和移除该次监听: `addListener`

    ```ts

    // 添加监听事件
    const listener = localStorageUtil.addListener("onDateExpiredWhenGet",(...args)=>{
      // 获取数据时，数据过期
    })


    // 移除该次事件
    listener.remove()

    ```

  - 移除大类事件: `removeListener`

    ```ts
      // 会移除注册在`onDateExpiredWhenGet`下的所有事件
      localStorageUtil.removeListener("onDateExpiredWhenGet")
    ```

  - 移除所有监听事件: `removeAllListener`

    ```ts
      localStorageUtil.removeAllListener()
    ```

  - 清理过期数据: `clearExpiredData`

    ```ts
      localStorageUtil.clearExpiredData()
    ```
  