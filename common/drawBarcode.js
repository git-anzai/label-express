
const drawImg = require('./drawImage')
const barcode = require('barcode');
const path = require('path');

let drawBarCode = (...arg) => {
    let [billCode, codeType, barcodeParams, codeMsg] = arg;

    return new Promise((resolve, reject) => {
            code128 = barcode(codeType, barcodeParams);
        let outfile = path.resolve(__dirname,'..')+`/public/images/ZTO_barcode/ZTO_barcode${barcodeParams.data}.jpg`;
        try {
            code128.saveImage(outfile, (err) => {
                if (err) {
                    console.log({timestamp: new Date().toLocaleString(),message:err || "生成barcode失败！"});
                    resolve({success: false, message: '生成barcode失败', errMsg: err});
                    reject({errMsg: err})
                } else {
                    drawImg.drawImg(billCode, barcodeParams.data, codeMsg, resolve);
                }
            });
        }
        catch (err) {
            console.log({timestamp: new Date().toLocaleString(),message:err || "生成barcode失败！"});
            resolve({success: false, message: 'catch,生成barcode失败'})
        }
    })
}


module.exports = {
    drawBarCode
}