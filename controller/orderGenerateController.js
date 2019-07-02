const orderGenerateService = require('../service/orderGenerateService');
const task = require('../utils/logistics_config');


let orderGenerateApi = async (req, res, next) => {
    const logistics_type = req.body['data[logistics_type]'];

    let data = await orderGenerateService.orderGenerate(req);
    if (data.success){
        if(logistics_type){
            task.logistics[logistics_type](req.body,res);
        }else {
            res.json({success:false,message:"请选择物流类型"})
        }
    }
}


module.exports = {
    orderGenerateApi
}