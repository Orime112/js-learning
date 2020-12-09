const request = new XMLHttpRequest()

request.open('get', 'http://localhost:8080/get?name=测试啊&body=原生ajax测试')
request.send()
request.responseType = 'json'
request.onreadystatechange = function () {
  if (request.readyState === 4) {
    if (request.status >= 200 && request.status < 300) {
      let response = {
        data: request.response ? request.response : request.responseText,
        headers: request.getAllResponseHeaders(),
      }
      console.log(response);
    } else {
      console.log('发起请求出错');
    }
  }
}