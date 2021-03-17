let data = ''
onconnect = function(e){
  let port = e.ports[0]

  port.onmessage = function(e){
    if(e.data === 'get'){
      port.postMessage(data)
    } else {
      data = e.data
    }
  }
}