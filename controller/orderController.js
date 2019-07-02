const orderService = require('../service/orderService');


let getOrderListApi = async (req, res, next) => {
    let {order, mobile, buyerName, pageCurrent, pageSize} = req.query;
    let data = await orderService.getOrderList(order, mobile, buyerName, pageCurrent, pageSize);
    res.json(data);
}


module.exports = {
    getOrderListApi
}