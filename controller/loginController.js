const loginCervice = require('../service/loginService');

let apiTest = async (req, res, next) => {
    // res.send('respond with a resource');
}


let loginApi = async (req, res, next) => {
    //    console.log(req.body['data[userName]'])
    let {userName, password} = req.body;
    let data = await loginCervice.login(req,userName, password);
    res.json(data);
}


module.exports = {
    apiTest,
    loginApi
}