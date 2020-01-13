/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
//模板编译器的入口文件
//总体流程为：
//将一堆字符串模板解析成抽象语法树AST后，我们就可以对其进行各种操作处理了，
//处理完后用处理后的AST来生成render函数。其具体流程可大致分为三个阶段：
//1.模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST；
//2.优化阶段：遍历AST，找出其中的静态节点，并打上标记；
//3.代码生成阶段：将AST转换成渲染函数；
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  //1.模板解析阶段
  //通过解析html、text、过滤器等等，拿到了AST
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    //2.优化阶段
    //针对静态节点：有一种节点一旦首次渲染上了之后不管状态再怎么变化它都不会变了，这种节点叫做静态节点
    //为了提高虚拟DOM中patch过程的性能。
    //在优化阶段将所有静态节点都打上标记，这样在patch过程中就可以跳过对比这些节点。
    //进行优化
    optimize(ast, options)
  }
  //3.代码生成阶段
  //最终生成的内容是render函数字符串
  //所谓代码生成其实就是根据模板对应的抽象语法树AST生成一个函数，通过调用这个函数就可以得到模板对应的虚拟DOM
  const code = generate(ast, options)
  //将生成的render函数字符串外传
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
