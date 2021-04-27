/**
 * 实现一个简单的模板渲染，给定一个模板和一个对象，利用对象中的数据渲染模板，并返回最终结果
 */

let tpl =
  "你好，我们公司是<% company.name %>，我们部门是<% bu %>，我们的base在<% company.info.location %>"
let tplData = {
  company: {
    name: "有赞",
    info: {
      location: "西溪路",
    },
  },
  bu: "SCRM",
}

function renderTpl(template, data) {
  return template.replace(/<% (\S+) %>/g, (content, $1) => {
    return eval(`data.${$1}`)
  })
}

const str = renderTpl(tpl, tplData)

console.log(str)
