const path = require('path');

let rootPath = path.resolve(__dirname,'..');

let getLabelApi = async (req, res, next) => {
    const code = req.query['code'];
   res.download(`${rootPath}/public/images/ZTO_order/ZTO_order${code}.jpg`)
}


module.exports = {
    getLabelApi
}