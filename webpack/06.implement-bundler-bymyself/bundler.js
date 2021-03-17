const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const analyseModule = (filename = './src/index.js') => {
  const content = fs.readFileSync(filename, 'utf8')
  // console.log(content)
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const dependencies = {}
  traverse(ast, {
    ImportDeclaration({node}){
      const dirname = path.dirname(filename) // src
      console.log(dirname, node.source.value)
      const newFile = path.join("./", dirname, node.source.value)
      dependencies[node.source.value] = newFile
    }
  })
  // console.log(dependencies)
  const {code} = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  })
  // console.log(code)
  return {
    filename,
    dependencies,
    code
  }
}

const makeDependenciesGraph = (filename) => {
  const entryModule = analyseModule(filename)
  const graphArray = [entryModule]
  for(let i = 0; i < graphArray.length; i++){
    const { dependencies } = graphArray[i]
    if(dependencies && Object.keys(dependencies).length > 0){
      for(let key in dependencies){
        graphArray.push(analyseModule(dependencies[key]))
      }
    }
  }
  // console.log(graphArray, 'graphArr')
  const graph = {}
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}

const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  console.log(graph)
  return `
  (function(graph){
    function require(module){
      var exports = {}
      function localRequire(relativePath){
        return require(graph[module].dependencies[relativePath])
      }
      (function(require, exports, code){
        eval(code)
      })(localRequire, exports, graph[module].code)
      return exports
    }
    require('${entry}')
  })(${graph}) `
}

const code = generateCode('./src/index.js')
console.log(code)
