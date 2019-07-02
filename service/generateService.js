const {query} = require('../database/query');


let generateLabel = async (res) => {
    const {id} = res;
    if(id) {
        let getOrderSql = 'update order_list set order_status = ?  where  id = ?';
        let result = await query(getOrderSql,[1,id]);
        if (result['affectedRows']==1) {
            return res
        } else {
            return {success:false,message:'更改订单状态失败'}
        }
    } else {
        return res
    }

}

module.exports = {
    generateLabel,
}