document.addEventListener("click", () => {
  import(/* webpackPrefetch: true */ "./js/pre-fetch-click").then(({ default: func }) => {
    func()
  })
})
