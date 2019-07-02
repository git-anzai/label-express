const generateService = require('../service/generateService');
const param = require('../utils/paramsHandle');
const api = require('../utils/api');
const strJion = require('../utils/strJion');
const fetchMethods = require('../common/fetch');
const drawImg = require('../common/drawBarcode')

let task = async (req,res) => {
    const orderId = req['data[id]'];
    const buyerName = req['data[buyerName]']
    const buyerMobile = req['data[buyerMobile]']
    const buyer_city = req['data[buyer_city]']
    const buyer_address = req['data[buyer_address]']
    const buyer_district = req['data[buyer_district]']
    const buyer_province = req['data[buyer_province]']

    let sender_name = '曹金伟';
    let sender_mobile = '13811183973';
    let sender_province = '北京';
    let send_city = '北京市';
    let sender_city = '北京，北京市，房山区';
    let send_district = '房山区';
    let sender_address = '阎村科技园南门内东侧200米';
    let _mailAddress = '北京市房山区阎村科技园南门内东侧200米';

    if(!buyerName||!buyerMobile||!buyer_city||!buyer_address||!buyer_district||!buyer_province){
         res.json({success:false,message:'请补全订单信息'})
    } else {

        let code = Math.random().toString().slice(-14)

        let data = `{"partner":"e823306680284cf6a0beab0871862c65","id":"${code}","sender":{"name":"${sender_name}","mobile":"${sender_mobile}","city":"${sender_city}","address":"${sender_address}"},"receiver":{"name":"${buyerName}","mobile":"${buyerMobile}","city":"${buyer_city}","address":"${buyer_address}"}}`;
        /***
         * @data 需要加密参数
         * @submitAgent 中通面单接口type
         ***/
        let params = param.paramsHandle(data, 'submitAgent');
        let resSubmitAgent = await fetchMethods.globalFetch(api.InsertSubmitagent, params);

        let mData = `{"unionCode": "${code}","send_province": "${sender_province}","send_city": "${send_city}","send_district": "${send_district}","receive_province": "${buyer_province}","receive_city": "${buyer_city}","receive_district":"${buyer_district}","receive_address": "${buyer_address}"}`

        let markData = param.paramsHandle(mData,'GETMARK');
        let getmark = await fetchMethods.globalFetch(api.bagAddrMarkGetmark, markData);
        console.log('大头笔res',getmark);


        /*
         * 判断中通接口失败或成功
         */
        if (!resSubmitAgent.result) {
            let data = {timestamp: new Date().toLocaleString(), submitagent: res, msg: 'api error'};
            console.log(data)
            res.json(data);
        } else {
            /*
             *  请求成功后生成条形码
             */
            const codeType = 'code128';
            let billCode = resSubmitAgent.data.billCode
            billCode = strJion.strJion(billCode);
            const barcodeParams = {data: resSubmitAgent.data.billCode, width: 210, height: 40}
            /*
             * 生成面单所需必要参数
             */
            let codeMsg = {
                type: "ZTO",
                _addressee: `${buyerName}  ${buyerMobile}`,
                _receivAddress: `${buyer_address}`,
                _sender: `${sender_name} ${sender_mobile}`,
                _mailAddress: _mailAddress,
                id: orderId,
                getmark: getmark.result
            }
            /*
             * 调用方法生成条形码
             */
            let result = await drawImg.drawBarCode(billCode, codeType, barcodeParams, codeMsg);
            result.success = result.success || false;
            let data = await generateService.generateLabel(result);
            res.json(data)
        }
    }
}

module.exports  = {
    task
}