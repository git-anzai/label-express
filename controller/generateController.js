const task = require('../utils/logistics_config')

let generateLabelApi = async (req, res, next) => {
    const logistics_type = req.body['data[logistics_type]'];
    task.logistics[logistics_type](req.body, res);


    // const orderId = req.body['data[id]'];
    // const buyerName = req.body['data[buyerName]']
    // const buyerMobile = req.body['data[buyerMobile]']
    // const buyer_city = req.body['data[buyer_city]']
    // const buyer_address = req.body['data[buyer_address]']


}


module.exports = {
    generateLabelApi
}