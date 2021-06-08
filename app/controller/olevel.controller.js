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
    let olevelRes = req.body.result;
    olevelRes.forEach((jamb) => {
        Olevel.findOne({
            where: {
                subjectId: req.subjectId,
                sitting: req.sitting
            }
        }).then(olevelResult => {
            if(olevelResult){
                Olevel.update({
                    examId: jamb.examId,
                    subjectId: jamb.subjectId,
                    userId: req.userId,
                    grade: jamb.grade,
                    sitting: jamb.sitting
                },
                {
                    where: {
                        id: parseInt(olevelResult.id)
                    }
                }).then(result => {
                    res.status(200).send({result: result, success: true, message: 'olevel Result has been updated successfully'})
                }).catch(err => {
                    res.status(400).send({message:err.message, success: false})
                })
            } else {
                Olevel.create({
                    examId: jamb.examId,
                    subjectId: jamb.subjectId,
                    userId: req.userId,
                    grade: jamb.grade,
                    sitting: jamb.sitting
                }).then(result => {
                    res.status(200).send({result: result, success: true, message: 'olevel Result has been updated successfully'})
                }).catch(err => {
                    res.status(400).send({message:err.message, success: false})
                })
            }
        });
    });
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