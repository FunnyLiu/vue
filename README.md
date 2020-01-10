
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
|  ├── compiler - 与模板编译相关的代码
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
|  ├── core - 通用的、与运行平台无关的运行时代码
|  |  ├── components - 内置组件的代码
|  |  |  ├── index.js
|  |  |  └── keep-alive.js - keep-alive组件实现
|  |  ├── config.js
|  |  ├── global-api - 全局api的代码
|  |  |  ├── assets.js
|  |  |  ├── extend.js
|  |  |  ├── index.js
|  |  |  ├── mixin.js
|  |  |  └── use.js
|  |  ├── index.js
|  |  ├── instance - Vue.js实例的构造函数和原型方法
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
|  |  ├── observer - 实现变化侦测的代码
|  |  |  ├── array.js - hack的数组方法，用来给watcher通信来完成可观察对象的转换
|  |  |  ├── dep.js - 专门负责收集依赖的类Dep
|  |  |  ├── index.js - 提供Observer实例，对需要的object，通过defineProperty递归的建立可观察对象；对需要的数组，通过array.js提供的方法对数组原型进行hack复写，并植入观察逻辑
|  |  |  ├── scheduler.js - 处理watchers队列，通过nextTick批量处理
|  |  |  ├── traverse.js
|  |  |  └── watcher.js - 给vm和observer之间进行桥接的数据更新依赖者
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
|  |  └── vdom - 实现virtual dom的代码
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
|  |     ├── patch.js - patch阶段实现，包含了diff算法的具体过程和vnode转为真实dom的操作
|  |     └── vnode.js - VNode的描述class
|  ├── platforms - 特定平台运行时代码
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
|  ├── sfc - 单文件组件的解析代码
|  |  └── parser.js
|  └── shared - 项目用到的公共代码
|     ├── constants.js
|     └── util.js
├── types - typescript声明文件
└── yarn.lock

directory: 111 file: 531

ignored: directory (2)

```

## 整体生命周期

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200103155422.png"/>

### 对象的观察

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200109162041.png"/>


### 数组的观察

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200109162255.png"/>

### VNode的更新流程

<img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20200110113704.png"/>


## 外部模块依赖

请在： http://npm.broofa.com?q=vue 查看

## 内部模块依赖

![img](./inner.svg)




## 逐个文件分析

### types/index.d.ts

typescript声明文件的入口，包含了Vue对象和其他内部提供api的类型声明。



### src/core/observer/dep.js

专门负责收集依赖的类Dep

### src/core/observer/index.js

负责建立对象和数组数据可观测对象的入口，针对数据采用hack原型方法的方式，针对对象则是递归object，对每个子属性进行观察。


<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>
<p align="center">
  <a href="https://circleci.com/gh/vuejs/vue/tree/dev"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg" alt="Build Status"></a>
  <a href="https://codecov.io/github/vuejs/vue?branch=dev"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg" alt="Coverage Status"></a>
  <a href="https://npmcharts.com/compare/vue?minimal=true"><img src="https://img.shields.io/npm/dm/vue.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
  <a href="https://chat.vuejs.org/"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat"></a>
  <br>
  <a href="https://app.saucelabs.com/builds/50f8372d79f743a3b25fb6ca4851ca4c"><img src="https://app.saucelabs.com/buildstatus/vuejs" alt="Build Status"></a>
</p>

<h2 align="center">Supporting Vue.js</h2>
Vue.js is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome [backers](https://github.com/vuejs/vue/blob/dev/BACKERS.md). If you'd like to join them, please consider:

- [Become a backer or sponsor on Patreon](https://www.patreon.com/evanyou).
- [Become a backer or sponsor on Open Collective](https://opencollective.com/vuejs).
- [One-time donation via PayPal or crypto-currencies.](https://vuejs.org/support-vuejs/#One-time-Donations)

#### What's the difference between Patreon and OpenCollective?

Funds donated via Patreon go directly to support Evan You's full-time work on Vue.js. Funds donated via OpenCollective are managed with transparent expenses and will be used for compensating work and expenses for core team members or sponsoring community events. Your name/logo will receive proper recognition and exposure by donating on either platform.

<h3 align="center">Special Sponsors</h3>
<!--special start-->

<p align="center">
  <a href="https://stdlib.com/" target="_blank">
    <img width="260px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/stdlib.png">
  </a>
</p>

<!--special end-->

<h3 align="center">Platinum Sponsors</h3>
<!--platinum start-->
<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://vueschool.io/?utm_source=Vuejs.org&utm_medium=Banner&utm_campaign=Sponsored%20Banner&utm_content=V1" target="_blank">
          <img width="222px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/vueschool.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://vehikl.com/" target="_blank">
          <img width="222px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/vehikl.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.nativescript.org/vue?utm_source=vue-js-org&utm_medium=website&utm_campaign=nativescript-awareness" target="_blank">
          <img width="222px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/nativescript.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://retool.com/?utm_source=sponsor&utm_campaign=vue" target="_blank">
          <img width="222px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/retool.png">
        </a>
      </td>
    </tr><tr></tr>
  </tbody>
</table>
<!--platinum end-->

<!--special-china start-->
<h3 align="center">Platinum Sponsors (China)</h3>
<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="http://www.dcloud.io/?hmsr=vuejsorg&hmpl=&hmcu=&hmkw=&hmci=" target="_blank">
          <img width="177px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/dcloud.gif">
        </a>
      </td>
    </tr><tr></tr>
  </tbody>
</table>
<!--special-china end-->

<h3 align="center">Gold Sponsors</h3>
<!--gold start-->
<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://www.vuemastery.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/vuemastery.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://laravel.com" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/laravel.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://chaitin.cn/en/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/chaitin.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://htmlburger.com" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/html_burger.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.frontenddeveloperlove.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/frontendlove.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://onsen.io/vue/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/onsen_ui.png">
        </a>
      </td>
    </tr><tr></tr>
    <tr>
      <td align="center" valign="middle">
        <a href="https://neds.com.au/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/neds.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://icons8.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/icons_8.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://vuejobs.com/?ref=vuejs" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/vuejobs.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://tidelift.com/subscription/npm/vue" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/tidelift.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://opteo.com/vue" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/opteo.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://devsquad.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/devsquad.png">
        </a>
      </td>
    </tr><tr></tr>
    <tr>
      <td align="center" valign="middle">
        <a href="https://www.firesticktricks.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/firestick_tricks.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://intygrate.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/intygrate.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://passionatepeople.io/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/passionate_people.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="http://en.shopware.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/shopware_ag.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.vpnranks.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/vpnranks.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.simplyswitch.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/energy_comparison.png">
        </a>
      </td>
    </tr><tr></tr>
    <tr>
      <td align="center" valign="middle">
        <a href="https://www.bacancytechnology.com" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/bacancy_technology.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.bestvpn.co/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/bestvpn_co.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.y8.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/y8.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://js.devexpress.com/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/devexpress.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://fastcoding.jp/javascript/ " target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/fastcoding_inc.svg">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://usave.co.uk/utilities/broadband" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/usave.png">
        </a>
      </td>
    </tr><tr></tr>
    <tr>
      <td align="center" valign="middle">
        <a href="https://www.dailynow.co/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/daily.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://storekit.com" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/storekit.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="http://www.pullrequest.com" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/pullrequest.svg">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://unicorn.io/" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/unicorn_io.svg">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://thepiratebayproxylist.se" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/piratebayproxy.png">
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.programmers.io" target="_blank">
          <img width="148px" src="https://raw.githubusercontent.com/vuejs/vuejs.org/master/themes/vue/source/images/programmers_io.png">
        </a>
      </td>
    </tr><tr></tr>
  </tbody>
</table>
<!--gold end-->

<h3 align="center">Sponsors via <a href="https://opencollective.com/vuejs">Open Collective</a></h3>
<h4 align="center">Platinum</h4>
<a href="https://opencollective.com/vuejs/tiers/platinum-sponsors/0/website" target="_blank" rel="noopener noreferrer"><img src="https://opencollective.com/vuejs/tiers/platinum-sponsors/0/avatar.svg"></a>
<a href="https://opencollective.com/vuejs/tiers/platinum-sponsors/1/website" target="_blank" rel="noopener noreferrer"><img src="https://opencollective.com/vuejs/tiers/platinum-sponsors/1/avatar.svg"></a>

<h4 align="center">Gold</h4>
<a href="https://opencollective.com/vuejs/tiers/gold-sponsors/0/website" target="_blank" rel="noopener noreferrer"><img src="https://opencollective.com/vuejs/tiers/gold-sponsors/0/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/vuejs/tiers/gold-sponsors/1/website" target="_blank" rel="noopener noreferrer"><img src="https://opencollective.com/vuejs/tiers/gold-sponsors/1/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/vuejs/tiers/gold-sponsors/2/website" target="_blank" rel="noopener noreferrer"><img src="https://opencollective.com/vuejs/tiers/gold-sponsors/2/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/vuejs/tiers/gold-sponsors/3/website" target="_blank" rel="noopener noreferrer"><img src="https://opencollective.com/vuejs/tiers/gold-sponsors/3/avatar.svg" height="60px"></a>
<a href="https://opencollective.com/vuejs/tiers/gold-sponsors/4/website" target="_blank" rel="noopener noreferrer"><img src="https://opencollective.com/vuejs/tiers/gold-sponsors/4/avatar.svg" height="60px"></a>

---

## Introduction

Vue (pronounced `/vjuː/`, like view) is a **progressive framework** for building user interfaces. It is designed from the ground up to be incrementally adoptable, and can easily scale between a library and a framework depending on different use cases. It consists of an approachable core library that focuses on the view layer only, and an ecosystem of supporting libraries that helps you tackle complexity in large Single-Page Applications.

#### Browser Compatibility

Vue.js supports all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE8 and below are not supported).

## Ecosystem

| Project | Status | Description |
|---------|--------|-------------|
| [vue-router]          | [![vue-router-status]][vue-router-package] | Single-page application routing |
| [vuex]                | [![vuex-status]][vuex-package] | Large-scale state management |
| [vue-cli]             | [![vue-cli-status]][vue-cli-package] | Project scaffolding |
| [vue-loader]          | [![vue-loader-status]][vue-loader-package] | Single File Component (`*.vue` file) loader for webpack |
| [vue-server-renderer] | [![vue-server-renderer-status]][vue-server-renderer-package] | Server-side rendering support |
| [vue-class-component] | [![vue-class-component-status]][vue-class-component-package] | TypeScript decorator for a class-based API |
| [vue-rx]              | [![vue-rx-status]][vue-rx-package] | RxJS integration |
| [vue-devtools]        | [![vue-devtools-status]][vue-devtools-package] | Browser DevTools extension |

[vue-router]: https://github.com/vuejs/vue-router
[vuex]: https://github.com/vuejs/vuex
[vue-cli]: https://github.com/vuejs/vue-cli
[vue-loader]: https://github.com/vuejs/vue-loader
[vue-server-renderer]: https://github.com/vuejs/vue/tree/dev/packages/vue-server-renderer
[vue-class-component]: https://github.com/vuejs/vue-class-component
[vue-rx]: https://github.com/vuejs/vue-rx
[vue-devtools]:  https://github.com/vuejs/vue-devtools

[vue-router-status]: https://img.shields.io/npm/v/vue-router.svg
[vuex-status]: https://img.shields.io/npm/v/vuex.svg
[vue-cli-status]: https://img.shields.io/npm/v/@vue/cli.svg
[vue-loader-status]: https://img.shields.io/npm/v/vue-loader.svg
[vue-server-renderer-status]: https://img.shields.io/npm/v/vue-server-renderer.svg
[vue-class-component-status]: https://img.shields.io/npm/v/vue-class-component.svg
[vue-rx-status]: https://img.shields.io/npm/v/vue-rx.svg
[vue-devtools-status]: https://img.shields.io/chrome-web-store/v/nhdogjmejiglipccpnnnanhbledajbpd.svg

[vue-router-package]: https://npmjs.com/package/vue-router
[vuex-package]: https://npmjs.com/package/vuex
[vue-cli-package]: https://npmjs.com/package/@vue/cli
[vue-loader-package]: https://npmjs.com/package/vue-loader
[vue-server-renderer-package]: https://npmjs.com/package/vue-server-renderer
[vue-class-component-package]: https://npmjs.com/package/vue-class-component
[vue-rx-package]: https://npmjs.com/package/vue-rx
[vue-devtools-package]: https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

## Documentation

To check out [live examples](https://vuejs.org/v2/examples/) and docs, visit [vuejs.org](https://vuejs.org).

## Questions

For questions and support please use [the official forum](http://forum.vuejs.org) or [community chat](https://chat.vuejs.org/). The issue list of this repo is **exclusively** for bug reports and feature requests.

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/vuejs/vue/releases).

## Stay In Touch

- [Twitter](https://twitter.com/vuejs)
- [Blog](https://medium.com/the-vue-point)
- [Job Board](https://vuejobs.com/?ref=vuejs)

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md) before making a pull request. If you have a Vue-related project/component/tool, add it with a pull request to [this curated list](https://github.com/vuejs/awesome-vue)!

Thank you to all the people who already contributed to Vue!

<a href="https://github.com/vuejs/vue/graphs/contributors"><img src="https://opencollective.com/vuejs/contributors.svg?width=890" /></a>


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013-present, Yuxi (Evan) You
