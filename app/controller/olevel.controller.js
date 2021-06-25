const db = require('../model');
const Olevel = db.olevel;

exports.ReadMyOlevelResult = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Olevel.findAndCountAll({
        where: {
            userId: req.userId != null ? req.userId : req.body.userId
        },
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Olevel Result are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

exports.ReadOlevelResultById = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Olevel.findAndCountAll({
        where: {
            userId: req.body.userId
        },
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Olevel Result are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}


exports.updateOlevelResult = (req, res) => {
    let olevelRes = JSON.parse(req.body.result);
  
     console.log(olevelRes);

    res.status(200).send({result: olevelRes, message: 'success'});
}

exports.deleteOlevelResult = (req, res) =>{
    Olevel.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'olevel Result has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}