var express = require('express');
var router = express.Router();
var loginController = require('../controller/loginController');
var orderController = require('../controller/orderController');
var generateController = require('../controller/generateController');
var getLabelController = require('../controller/getLabelController');
var orderGenerateController = require('../controller/orderGenerateController');
var orderUploadController = require('../controller/orderUploadController');
const jwtAuth = require('../utils/jwt');

/* GET users listing. */
// router.get('/', apiController.apiTest);
router.use(jwtAuth);

router.post('/login', loginController.loginApi);
router.post('/generateLabel', generateController.generateLabelApi);
router.post('/orderGenerate', orderGenerateController.orderGenerateApi);
router.get('/getOrderList', orderController.getOrderListApi);
router.get('/getLabel', getLabelController.getLabelApi);
router.post('/orderUpload', orderUploadController.orderUploadApi);


// router.use((err,req,res,next) => {
//     // 任何路由信息都会执行这里面的语句
//     // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
//     console.log(11111111)
// })
router.use((err, req, res, next) => {
    if (err) {
        if (err.name === "UnauthorizedError") {
            res.status(200).json({
                message: 'invalid token,请重新登录',
                error: 110,
                success: false,
                errorMsg: err
            });
        } else {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        }
    } else {
        next();
    }
});


module.exports = router;
