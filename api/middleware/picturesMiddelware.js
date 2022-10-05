const db = require("../../database/models");
const {check, body} = require('express-validator');
const handleErrors = require('./handleErrors');
const {verifyUrl, verifyFkIdProduct, verifyPictureHasProperties} = require("../../helpers/verifyPicture")


const createPictureVerify = [
    check("url", "Ingrese una url").not().isEmpty(),
    check("fk_id_product", "Ingrese un id de producto").not().isEmpty(),
    check("url").custom(verifyUrl),
    check("fk_id_product").custom(verifyFkIdProduct),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const editPictureVerify = [
    check("url").isLength({min: 1}).optional({nullable: true}),
    check("url").custom(verifyUrl).optional({nullable: true}),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const existPictureVerify = async(req,res,next) => {
    try{        
        const picture = await db.Picture.findByPk(Number(req.params.id));
        if (picture){
            req.picture = picture;
            next();
        }
        else res.status(404).json({msg: "la foto no existe"})
    }
    catch(error){
        res.status(500).json({msg: "Server error"});
    }
}

const verifyRoleEditPicture = (req,res,next) => {
    let role = req.role;
    if(role == 'guest') res.status(401).json({msg: 'No tiene permisos sobre las fotos'});
    else next();
}

module.exports = {
    createPictureVerify,
    editPictureVerify,
    existPictureVerify,
    verifyRoleEditPicture
};