let strJion = (billCode) => {
    const item1 = billCode.substring(0, 4)
    const item2 = billCode.substring(4, 8)
    const item3 = billCode.substring(8, 12)
    const item4 = billCode.substring(12, 14)
    /*    let data = {
            item1,
            item2,
            item3,
            item4,
        }
        console.log(billCode)
        console.log(data)*/
    let billCodeArr = [item1, item2, item3, item4];
    billCode = billCodeArr.join("  ")
    return billCode
}

module.exports = {
    strJion,
}

