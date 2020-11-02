/**
* 基于Promise封装一个ajax库
* + 参考axios用法
* + XMLHttpRequest
* 
* 基于语法：
* axios(config)
* axios.get/head/options/delete(url, config)
* axios.post/put(url, data, config)
* 
* 二次配置
* +默认配置项
* axios.defaults.xxx 修改默认配置
* axios(config) 自己传递的配置项
* 
* 支持的配置项
* {
*  baseUrl: '',
*  url: '',
*  method: '', // 默认get请求
*  transformRequest: function(data){return data}, // post请求下处理请求主体，只在post请求下有用
*  headers: {
*    'Content-Type': 'application/json',
*  },
*  params: {}, // URL默认传参
*  timeout: 0, // 设置请求超时时间
*  withCredentials: Boolean, // 是否允许跨域请求中携带资源凭证
*  responseType: 'json', // 预设服务器返回结果的处理方案
*  validateStatus: function(status){
*    return status >= 200 && status < 300; // default
*  }
* }
* 
* 拦截器
* + 请求拦截器 ajax.interceptors.request(function(){})
* + 响应拦截器 ajax.interceptors.response(function(){}, function(reason){})
* + ajax.all(<promise>Array)
* 
* 基于ajax请求返回的结果都是ajax实例
*  + response
*    + data 响应主体信息
*    + status 状态码
*    + statusText 状态码的描述
*    + headers 响应头信息
*    + request XMR原生对象
*  + reason
*    + response
*    + message 错误信息
*    + ...
*/

(function(){
  // 基于面向对象进行封装，便于私有属性实例属性泾渭分明
  // 使用class ajax创建ajax类是不能直接当做普通函数执行的
  function ajax(config = {}){
    // 当做普通函数执行并且创建这个类的实例

  }

  // ajax中提供了众多快捷调用方法，本质还是调用ajax方法
  ['get', 'head', 'delete', 'options'].forEach(name => {
    ajax[name] = function(url, config = {}){
      config = {
        url,
        method: name,
        ...config
      }
      return ajax(config)
    }
  })
  ['post', 'put'].forEach(name => {
    ajax[name] = function(url, data = {}, config = {}){
      config = {
        url,
        method: name,
        data,
        ...config
      }
      return ajax(config)
    }
  })
  ajax['all'] = function(arr = []){}

  ajax.get()

  // 暴露API
  if(typeof window !== "undefined"){
    window.ajax = ajax
  }
  if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = ajax
  }
})()

ajax.all([x1, x2, x3]) // 所有ajax请求都成功才算成功