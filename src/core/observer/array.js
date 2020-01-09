/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  // 对数组方法进行hack
  def(arrayMethods, method, function mutator (...args) {
    //其值
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    //对新增的元素做额外的响应式观察
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args// // 如果是push或unshift方法，那么传入参数就是新增的元素
        break
      case 'splice':
        inserted = args.slice(2)// 如果是splice方法，那么传入参数列表中下标为2的就是新增的元素
        break
    }
    if (inserted) ob.observeArray(inserted)// 调用observe函数将新增的元素转化成响应式
    // notify change
    //在数组调用这些方法时，手动通信来完成观察对象的更新
    ob.dep.notify()
    return result
  })
})
