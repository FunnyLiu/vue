
# 源码分析

## 文件结构

``` bash
/Users/liufang/openSource/FunnyLiu/vue
├── BACKERS.md
├── LICENSE
├── README.md
├── benchmarks
├── dist
├── examples
├── flow
├── package.json
├── packages
|  ├── vue-server-renderer
|  ├── vue-template-compiler
|  ├── weex-template-compiler
|  └── weex-vue-framework
├── scripts
├── src
|  ├── compiler
|  |  ├── codeframe.js
|  |  ├── codegen
|  |  |  ├── events.js
|  |  |  └── index.js
|  |  ├── create-compiler.js
|  |  ├── directives
|  |  |  ├── bind.js
|  |  |  ├── index.js
|  |  |  ├── model.js
|  |  |  └── on.js
|  |  ├── error-detector.js
|  |  ├── helpers.js
|  |  ├── index.js
|  |  ├── optimizer.js
|  |  ├── parser
|  |  |  ├── entity-decoder.js
|  |  |  ├── filter-parser.js
|  |  |  ├── html-parser.js
|  |  |  ├── index.js
|  |  |  └── text-parser.js
|  |  └── to-function.js
|  ├── core
|  |  ├── components
|  |  |  ├── index.js
|  |  |  └── keep-alive.js
|  |  ├── config.js
|  |  ├── global-api
|  |  |  ├── assets.js
|  |  |  ├── extend.js
|  |  |  ├── index.js
|  |  |  ├── mixin.js
|  |  |  └── use.js
|  |  ├── index.js
|  |  ├── instance
|  |  |  ├── events.js
|  |  |  ├── index.js - Vue对象的入口文件
|  |  |  ├── init.js
|  |  |  ├── inject.js
|  |  |  ├── lifecycle.js
|  |  |  ├── proxy.js
|  |  |  ├── render-helpers
|  |  |  |  ├── bind-dynamic-keys.js
|  |  |  |  ├── bind-object-listeners.js
|  |  |  |  ├── bind-object-props.js
|  |  |  |  ├── check-keycodes.js
|  |  |  |  ├── index.js
|  |  |  |  ├── render-list.js
|  |  |  |  ├── render-slot.js
|  |  |  |  ├── render-static.js
|  |  |  |  ├── resolve-filter.js
|  |  |  |  ├── resolve-scoped-slots.js
|  |  |  |  └── resolve-slots.js
|  |  |  ├── render.js
|  |  |  └── state.js
|  |  ├── observer
|  |  |  ├── array.js
|  |  |  ├── dep.js
|  |  |  ├── index.js
|  |  |  ├── scheduler.js
|  |  |  ├── traverse.js
|  |  |  └── watcher.js
|  |  ├── util
|  |  |  ├── debug.js
|  |  |  ├── env.js
|  |  |  ├── error.js
|  |  |  ├── index.js
|  |  |  ├── lang.js
|  |  |  ├── next-tick.js
|  |  |  ├── options.js
|  |  |  ├── perf.js
|  |  |  └── props.js
|  |  └── vdom
|  |     ├── create-component.js
|  |     ├── create-element.js
|  |     ├── create-functional-component.js
|  |     ├── helpers
|  |     |  ├── extract-props.js
|  |     |  ├── get-first-component-child.js
|  |     |  ├── index.js
|  |     |  ├── is-async-placeholder.js
|  |     |  ├── merge-hook.js
|  |     |  ├── normalize-children.js
|  |     |  ├── normalize-scoped-slots.js
|  |     |  ├── resolve-async-component.js
|  |     |  └── update-listeners.js
|  |     ├── modules
|  |     |  ├── directives.js
|  |     |  ├── index.js
|  |     |  └── ref.js
|  |     ├── patch.js
|  |     └── vnode.js
|  ├── platforms
|  |  ├── web
|  |  |  ├── compiler
|  |  |  |  ├── directives
|  |  |  |  |  ├── html.js
|  |  |  |  |  ├── index.js
|  |  |  |  |  ├── model.js
|  |  |  |  |  └── text.js
|  |  |  |  ├── index.js
|  |  |  |  ├── modules
|  |  |  |  |  ├── class.js
|  |  |  |  |  ├── index.js
|  |  |  |  |  ├── model.js
|  |  |  |  |  └── style.js
|  |  |  |  ├── options.js
|  |  |  |  └── util.js
|  |  |  ├── entry-compiler.js
|  |  |  ├── entry-runtime-with-compiler.js
|  |  |  ├── entry-runtime.js
|  |  |  ├── entry-server-basic-renderer.js
|  |  |  ├── entry-server-renderer.js
|  |  |  ├── runtime
|  |  |  |  ├── class-util.js
|  |  |  |  ├── components
|  |  |  |  |  ├── index.js
|  |  |  |  |  ├── transition-group.js
|  |  |  |  |  └── transition.js
|  |  |  |  ├── directives
|  |  |  |  |  ├── index.js
|  |  |  |  |  ├── model.js
|  |  |  |  |  └── show.js
|  |  |  |  ├── index.js
|  |  |  |  ├── modules
|  |  |  |  |  ├── attrs.js
|  |  |  |  |  ├── class.js
|  |  |  |  |  ├── dom-props.js
|  |  |  |  |  ├── events.js
|  |  |  |  |  ├── index.js
|  |  |  |  |  ├── style.js
|  |  |  |  |  └── transition.js
|  |  |  |  ├── node-ops.js
|  |  |  |  ├── patch.js
|  |  |  |  └── transition-util.js
|  |  |  ├── server
|  |  |  |  ├── compiler.js
|  |  |  |  ├── directives
|  |  |  |  |  ├── index.js
|  |  |  |  |  ├── model.js
|  |  |  |  |  └── show.js
|  |  |  |  ├── modules
|  |  |  |  |  ├── attrs.js
|  |  |  |  |  ├── class.js
|  |  |  |  |  ├── dom-props.js
|  |  |  |  |  ├── index.js
|  |  |  |  |  └── style.js
|  |  |  |  └── util.js
|  |  |  └── util
|  |  |     ├── attrs.js
|  |  |     ├── class.js
|  |  |     ├── compat.js
|  |  |     ├── element.js
|  |  |     ├── index.js
|  |  |     └── style.js
|  |  └── weex
|  ├── server
|  ├── sfc
|  |  └── parser.js
|  └── shared
|     ├── constants.js
|     └── util.js
├── types - typescript声明文件
└── yarn.lock

directory: 111 file: 531

ignored: directory (2)

```

## 外部模块依赖

请在： http://npm.broofa.com?q=vue 查看

## 内部模块依赖

![img](./inner.svg)
  