const db = require("../../database/models");
const { pasarATrueOrFalseArray, pasarATrueOrFalse } = require("../../helpers/pasarATrue");


//lista todos los productos, o lista por categoria.
const listProduct = async (req, res) => {

    const products = req.products;
    pasarATrueOrFalseArray(products)
    return res.status(200).json({ Productos: products });

}

const listProductByID = async (req, res) => {

    const product = req.product;    
    pasarATrueOrFalse(product);
    return res.status(200).json({ Producto: product });
}

const listProductByKeyword = async (req, res) => {

    const list = req.list;
    pasarATrueOrFalseArray(list);
    res.status(200).json({ Lista: list });

}

const listMostWantedProduct = async (req, res) => {

    const mostWanted = req.mostwanted;
    pasarATrueOrFalseArray(mostWanted);
    res.status(200).json({ ProductsMostwanted: mostWanted });

}

const createProduct = async (req, res) => {

    const body = req.body;
    const newProduct = await db.Product.create(body);
    pasarATrueOrFalse(newProduct);
    res.status(201).json({ newProduct });
    
}

const editProduct = async (req, res) => {
    const idProduct = req.id;

    const body = req.body;
    const fk_id_category = req.category;
    await db.Product.update({ ...body, fk_id_category },{ where: { id_product: Number(idProduct) } });
    const productEdited = await db.Product.findByPk(Number(idProduct), {
        include: [
            { association: 'pictures', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
            { association: 'category', attributes: { exclude: ['id_category'] }, require: false }
        ], attributes: { exclude: ['fk_id_category'] }
    });
    pasarATrueOrFalse(productEdited);
    res.status(200).json({ ProductoEditado: productEdited });

}

const deleteProduct = async (req, res) => {

    const id = req.id;
    const oldData = req.oldData;
    await db.Product.destroy({ where: { id_product: id } });
    res.status(200).json({ oldData });

}

module.exports = {
    listProduct,
    listProductByID,
    listProductByKeyword,
    listMostWantedProduct,
    createProduct,
    editProduct,
    deleteProduct
};