const {query} = require('../database/query');


let orderGenerate = async (req) => {
    const buyerName = req.body['data[buyerName]']
    const buyerMobile = req.body['data[buyerMobile]']
    const buyer_city = req.body['data[buyer_city]']
    const buyer_address = req.body['data[buyer_address]']
    const buyer_district = req.body['data[buyer_district]']
    const buyer_province = req.body['data[buyer_province]']
    const logistics_type = req.body['data[logistics_type]']
    let orderGenerateSql = 'insert into order_list set ?';
    let result = await query(orderGenerateSql,{buyer_name:buyerName,buyer_mobile:buyerMobile,buyer_city,buyer_address,buyer_district,buyer_province,logistics_type,order_status:1})
    if (result['affectedRows']==1) {
        return {success:true,message:'添加订单成功'}
    } else {
        return {success:false,message:'添加订单失败'}
    }
}

module.exports = {
    orderGenerate,
}