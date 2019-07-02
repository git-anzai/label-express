const {query} = require('../database/query');


let getOrderList = async (order, buyer_mobile, buyer_name, pageCurrent, pageSize) => {
    pageSize = pageSize || 100;
    let getOrderSql = `SELECT * FROM order_list where 1 = 1 `;
    let arr = [];
    if (order) {
        getOrderSql += `and order_code = ?`;
        arr.push(order)
    }
    if (buyer_mobile) {
        getOrderSql += `and buyer_mobile = ?`;
        arr.push(buyer_mobile)
    }
    if (buyer_name) {
        getOrderSql += `and buyer_name = ?`;
        arr.push(buyer_name)
    }
    getOrderSql += ` limit ${pageCurrent},${pageSize}`;
    let result = await query(getOrderSql, arr);

    let countSql = 'SELECT COUNT(*) FROM order_list';
    let totalCount = await query(countSql, []);
    totalCount = totalCount[0]['COUNT(*)'];
    return {
        message: '获取订单成功',
        code: '200',
        data: {list: result, pageSize: pageSize, totalCount: totalCount, pageCurrent: pageCurrent},
        success: true
    }
}

module.exports = {
    getOrderList,
}