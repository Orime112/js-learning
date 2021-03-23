let isLoading = true;

let p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(12), 1000)
})

p.then(function(response) {

    return response
  })
  .then(function(json) { 
    console.log(json, json)
   })
  .catch(function(error) { console.log(error); })
  .finally(function() { 
    isLoading = false;
    console.log('finally trigger')
   })
   .then((res) => {
     console.log(res) // ! undefined -> 可以继续链式调用，但是value值不再链式透传
   })

console.log(isLoading)