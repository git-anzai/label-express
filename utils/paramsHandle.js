const crypto = require('crypto');
const querystring = require('querystring');

let paramsHandle = (data,type) => {
    let company_id = "e823306680284cf6a0beab0871862c65";
    let key = "24d6fa3e40c2";

    let requestBody = {
        data: data,
        company_id: company_id,
        msg_type: type
    }

    let query_string = [];
    for (let k in requestBody) {
        query_string.push(k + "=" + requestBody[k]);
    }
    let str_to_digest = query_string.join("&") + key;


    let data_digest = crypto.createHash('md5')
        .update(str_to_digest)
        .digest('base64');

    let query_string_urlencoded = querystring.stringify(requestBody);

    let params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-companyid": company_id,
            "x-datadigest": data_digest
        },
        body: query_string_urlencoded,
    }

    return params
}




module.exports = {
    paramsHandle,
}