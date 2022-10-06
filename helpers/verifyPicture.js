const db = require("../database/models")


const verifyUrl = async (url) => {
    const exist = await db.Picture.findOne({
        where: {url: url}
    });
    if (exist) throw new Error(`la url ${url} ya se encuentra en uso`)
}

const verifyFkIdProduct = async (fk_id_product) => {
    const exist = await db.Product.findOne({
        where: {id_product: fk_id_product}
    });
    if (!exist) throw new Error(`el producto con id ${fk_id_product} no existe`)
}


module.exports = {
    verifyUrl,
    verifyFkIdProduct
}