import axios from 'axios'

console.log('引入mjs文件');

axios.get('http://localhost:8989', {

}).then((value) => {
  console.log(value);
}).catch(error => {
  console.log(error, '请求失败');
})
