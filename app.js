
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js")
    .then(reg => console.log("the service worker was registered", reg))
    .catch(err => console.log("the service worker failed to register", err))
}

