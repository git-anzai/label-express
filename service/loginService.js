const {query} = require('../database/query');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../utils/constant');


let login = async (req, userName, password) => {
    let loginSql = 'SELECT * from users where user_name = ? and password = ?';
    let params = [userName, password];
    let result = await query(loginSql, params);

    if (result.length > 0 && result[0].user_name == userName && result[0].password == password) {
        let token = jwt.sign({userName},
            secretKey,
            {
                expiresIn: '1days' // 授权时效60秒
            }
        );
        return {message: '登录成功', code: '200', data: {userName: userName}, success: true, token: token}
    } else {
        return {data: {}, message: '账号或密码错误', code: '201', success: false}
    }
}

module.exports = {
    login,
}