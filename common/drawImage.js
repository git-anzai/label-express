const gm = require('gm').subClass({imageMagick: true});
const path = require('path');

let drawImg = (billCode, code, codeMsg, resolve) => {
    try {
        selectType[codeMsg.type](billCode, code, codeMsg, resolve);
    }
    catch (err) {
        console.log({timestamp: new Date().toLocaleString(),message: "draw图片失败！"});
        resolve({success: false, message: 'catch,draw图片失败'});
    }
}

let selectType = {
    'ZTO': (billCode, code, codeMsg, resolve) => {
        let imagesPath =  path.resolve(__dirname,'..')+'/public/images';
        let fontPath =  path.resolve(__dirname,'..')+'/public/font';

        let addresslength = codeMsg._receivAddress.split('').length;
        let _receivAddress1, _receivAddress2,message1,message2;
        if(addresslength>28){
            _receivAddress1 = codeMsg._receivAddress.substring(0,29);
            _receivAddress2 =codeMsg._receivAddress.substring(29,addresslength)
        } else {
            _receivAddress1 = codeMsg._receivAddress;
            _receivAddress2 = '';
        }

        gm(imagesPath+'/ZTO_template.jpg')
            .font(fontPath+'/microsoftYaHei_bold.ttf')
            .fontSize('110')
            .drawText(300, 260, codeMsg.getmark.mark)
            .fontSize('68')
            .drawText(300, 1076, billCode)
            .draw(`image Over 56, 814 1080, 180 "${imagesPath}/ZTO_barcode/ZTO_barcode${code}.jpg"`)
            .draw(`image Over 580, 1333 600, 110 "${imagesPath}/ZTO_barcode/ZTO_barcode${code}.jpg"`)
            .fontSize('42')
            .drawText(680,1486, billCode)
            .drawText(140, 490, `${codeMsg._addressee}`)
            .drawText(140, 550, _receivAddress1+"\n"+_receivAddress2)
            .drawText(140, 696, `${codeMsg._sender}`)
            .drawText(140, 760, `${codeMsg._mailAddress}`)
            .drawText(140, 1550, `${codeMsg._addressee}`)
            .drawText(140, 1620, _receivAddress1+"\n"+_receivAddress2)
            .drawText(140, 1742, `${codeMsg._sender}`)
            .drawText(140, 1812, `${codeMsg._mailAddress}`)
            .write(`${imagesPath}/ZTO_order/ZTO_order${code}.jpg`, function (err) {
                if (!err) {
                    resolve({success: true, message: '生成图片成功',code:code,id:codeMsg.id});
                } else {
                    console.log({timestamp: new Date().toLocaleString(),message:err.message || "draw图片失败！"});
                    resolve({success: false, message: 'draw图片失败',code:''});
                }
            });
    }
}

module.exports = {
    drawImg
}