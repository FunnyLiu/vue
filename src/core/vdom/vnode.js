/* @flow */
// virtual dom 的基类
//VNode最大的用途就是在数据变化前后生成真实DOM对应的虚拟DOM节点，
//然后就可以对比新旧两份VNode，找出差异所在，然后更新有差异的DOM节点
//最终达到以最少操作真实DOM更新视图的目的。
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag  //当前节点标签名称
    this.data = data //具体的数据信息
    this.children = children //当前节点的子节点，是数组
    this.text = text //当前节点文本
    this.elm = elm //当前vnode对应的真实dom
    this.ns = undefined //当前节点的名字空间
    this.context = context //当前节点对应的Vue实例
    this.fnContext = undefined //函数式组件对应的vue实例
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key //节点的key，被当做标识
    this.componentOptions = componentOptions //组件的option选择
    this.componentInstance = undefined //组件的实例
    this.parent = undefined //当前节点的父节点
    this.raw = false //是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
    this.isStatic = false //是否是静态节点
    this.isRootInsert = true //是否是根节点
    this.isComment = false //是否是注释节点
    this.isCloned = false //是否为克隆节点
    this.isOnce = false //是否有v-once指令
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
// 创建文本节点
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
//克隆节点就是把一个已经存在的节点复制一份出来，它主要是为了做模板编译优化时使用
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  //现有节点和新克隆得到的节点之间唯一的不同就是克隆得到的节点isCloned为true
  cloned.isCloned = true
  return cloned
}
