const fetch = require('node-fetch');

let globalFetch = (...arg) => {
    let [api, params] = arg;
    return new Promise((resolve, reject) => {
        fetch(api, params).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    resolve(data);
                })
            }
        })
    })
}


/*let getCodeMsg = (...arg) => {
    let [api, params, type] = arg;
    return new Promise((resolve, reject) => {
        fetch(api, params).then(response => {
            selectType[type](response, resolve)
        })
    })
}
let selectType = {
    'ZTO': (response, resolve) => {
        if (response.ok) {
            response.json().then(data => {
                resolve(data);
            })
        }
    },
    "sf": () => {
        console.log('zf')
    }
}*/
module.exports = {
    // getCodeMsg,
    globalFetch
}