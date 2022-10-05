const db = require('../../database/models')

const listCategory = async (req, res) => {
    
        const categorys =req.category;
        return res.status(200).json({ Categories: categorys }); 
    
}

const listCategoryID =(req, res) => {
    
        const category = req.category;
        return res.status(200).json({ Category: category });
    
}

const createCategory = async (req, res) => {
    
        const body = req.body;
        const newCategory = await db.Category.create(body);
        res.status(201).json({ newCategory });
    
}

const editCategory = async (req, res) => {
    
        const body = req.body;
        const id = req.id;
        await db.Category.update({ ...body }, { where: { id_category: Number(id) } });
        const categoryEdit = await db.Category.findByPk(id, { attributes: { exclude: ['id_category'] }})
        res.status(200).json({ CategoryEdited: categoryEdit });
    
}

const deleteCategoryById = async (req,res) => {
    
        const id = req.id;
        const categoryShow = req.categoryShow;
        await db.Category.destroy({
            where: {id_category: id}
        })
        res.status(200).json( {CategoryDeleted : categoryShow});
    
}


module.exports = {
    listCategory,
    listCategoryID,
    createCategory,
    editCategory,
    deleteCategoryById
};
