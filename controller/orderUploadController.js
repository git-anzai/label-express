const formidable = require("formidable");
const xlsx = require('node-xlsx');
const {query} = require('../database/query');


const orderUploadApi = async(req,res,next) =>{

    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        let path = files['file']['path'];
        let excelData = xlsx.parse(path);
        for (let i = 0; i < excelData[0]['data'].length; i++) {
            excelData[0]['data'][i][1] = new Date(1900, 0, excelData[0]['data'][i][1] - 1).toLocaleString()
            console.log(excelData[0]['data'][i][1])
        }
        let j=0;
        for (let i = 0; i < excelData[0]['data'].length; i++) {
            j++;
            let obj = {}
            for (let j = 0; j < excelData[0]['data'][i].length; j++) {
                obj['order_code'] = excelData[0]['data'][i][0];
                obj['create_time'] = excelData[0]['data'][i][1];
                obj['buyer_name'] = excelData[0]['data'][i][2];
                obj['buyer_make'] = excelData[0]['data'][i][3];
                obj['buyer_mobile'] = excelData[0]['data'][i][4];
                obj['buyer_city'] = excelData[0]['data'][i][5];
                obj['buyer_address'] = excelData[0]['data'][i][6];
                obj['goods_name'] = excelData[0]['data'][i][7];
                obj['goods_code'] = excelData[0]['data'][i][8];
                obj['goods_count'] = excelData[0]['data'][i][9];
                obj['price_total'] = excelData[0]['data'][i][10];
                obj['order_status'] = excelData[0]['data'][i][11];
                obj['logistics_num'] = excelData[0]['data'][i][12];
                obj['logistics_type'] = excelData[0]['data'][i][13];
                obj['buyer_district'] = excelData[0]['data'][i][14];
                obj['buyer_province'] = excelData[0]['data'][i][15];
            }
            let result = await query(`insert into order_list set ?`, obj);
            console.log(result)
        }
        if (j == excelData[0]['data'].length){
            res.json({success: true,message:"导入表格成功"});
        } else {
            res.json({success: false,message:"导入表格失败"});
        }
    });


   /* let form = new formidable.IncomingForm();
    form.parse(req,async (err, fields, files) => {
        let path = files['file']['path'];
        let excelData = xlsx.parse(path);
        for (let i=0;i<excelData[0]['data'].length;i++) {
                excelData[0]['data'][i][1] =new Date(1900, 0, excelData[0]['data'][i][1] -1).toLocaleString()
               console.log(excelData[0]['data'][i][1])
        }
        let result = await query( `insert into order_list  VALUES ["T001","2019-4-18 17:56:25","小李","很好","136*****321","乳山市","城区街道北环路22号(264500)","五常大米","sku00001",2,210,1,"000001","ZTO","威海市","山东省"],["T002","2019-4-27 17:58:57","李四","good",17600000001,"太原市","迎泽区双塔寺街29号","五常大米","sku00002",3,420,1,"000002","ZTO","迎泽区","山西省"],["T003","2019-4-28 17:59:04","王五","nice",17600000002,"北京市","朝阳北路","五常大米","sku00003",4,630,1,"000003","ZTO","朝阳区","北京市"] `,'');
        console.log(result);
    });*/
}
module.exports = {
    orderUploadApi
}