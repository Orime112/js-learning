const proAjax = function(){
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('get', 'http://localhost:8080/get?name=promise测试&body=promise返回', true)
    request.responseType = 'json'
    request.send()
    request.onreadystatechange = function(){
      if(request.readyState === 4){
        if(request.status >= 200 && request.status < 300){
          let response = {
            data: request.response ? request.response : request.responseText,
            headers: request.getAllResponseHeaders(),
            status: request.status,
            statusText: request.statusText
          }
          resolve(response)
        } else {
          reject({status: request.status, statusText: request.statusText})
        }
      }
    }
  })
}

let send = proAjax()
send.then(res => console.log(res), (err) => console.log(err))