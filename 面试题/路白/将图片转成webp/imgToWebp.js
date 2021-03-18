function checkWebp() {
  try {
    return (
      document.createElement('canvas')
        .toDataURL()
        .startsWith('data:image/webp')
    )
  } catch () {
    return false
  }
}

const supportWebp = checkWebp()

function getWebpaURL(url){
  if(!url) {
    throw Error('url 不能为空！')
  }
  if(url.startsWith('data:')){
    return url
  }
  if(!supportWebp){
    return url
  }
  return url + '?x-sso-processsssssss'
}