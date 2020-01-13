/* @flow */

import { makeMap, isBuiltInTag, cached, no } from 'shared/util'

let isStaticKey
let isPlatformReservedTag

const genStaticKeysCached = cached(genStaticKeys)

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
//优化器
//为了提高虚拟DOM中patch过程的性能。
//在优化阶段将所有静态节点都打上标记，这样在patch过程中就可以跳过对比这些节点。

//优化阶段其实就干了两件事：

//1.在AST中找出所有静态节点并打上标记；
//2.在AST中找出所有静态根节点并打上标记；
//静态节点的定义：有一种节点一旦首次渲染上了之后不管状态再怎么变化它都不会变了
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // first pass: mark all non-static nodes.
  // 标记静态节点
  markStatic(root)
  // second pass: mark static roots.
  // 标记静态根节点
  markStaticRoots(root, false)
}

function genStaticKeys (keys: string): Function {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}
//标记静态节点
function markStatic (node: ASTNode) {
  //
  node.static = isStatic(node)
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    //递归
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        node.static = false
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
        }
      }
    }
  }
}
// 标记静态根节点
/**
 *  节点本身必须是静态节点；
 *  必须拥有子节点 children；
 *  子节点不能只是只有一个文本节点；
 *  否则的话，对它的优化成本将大于优化后带来的收益。
 */
function markStaticRoots (node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}
//判断是否是静态节点
function isStatic (node: ASTNode): boolean {
  //只有type为1是元素节点
  //包含变量的动态文本节点
  if (node.type === 2) { // expression
    return false
  }
  //不包含变量的纯文本节点
  if (node.type === 3) { // text
    return true
  }
  //针对于元素节点，会做进一步判断
  /**
   * 如果节点使用了v-pre指令，那就断定它是静态节点；
   * 如果节点没有使用v-pre指令，那它要成为静态节点必须满足：
   *    不能使用动态绑定语法，即标签上不能有v-、@、:开头的属性；
   *    不能使用v-if、v-else、v-for指令；
   *    不能是内置组件，即标签名不能是slot和component；
   *    标签名必须是平台保留标签，即不能是组件；
   *    当前节点的父节点不能是带有 v-for 的 template 标签；
   *    节点的所有属性的 key 都必须是静态节点才有的 key，
   *    注：静态节点的key是有限的，它只能是type,tag,attrsList,attrsMap,plain,parent,children,attrs之一；
   */
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node: ASTElement): boolean {
  while (node.parent) {
    node = node.parent
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}
