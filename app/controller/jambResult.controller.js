const db = require('../model');
const JambResult = db.jambResult;
const Subject = db.subject;

exports.ReadMyJambResult = (req, res) => {
    // JambResult.findAndCountAll({
    //     where: {
    //         userId: req.userId ? req.userId : req.body.userId
    //     },
    //     include: [
    //         {model: Subject}
    //     ]
    let sql = `SELECT * FROM jamb_results join subjects where jamb_results.subjectId = subjects.id AND userId = ${req.userId}`;
    db.sequelize.query(sql, {type: db.sequelize.QueryTypes.SELECT})
    .then(result => {
        res.status(200).send({result: result, success: true, message: 'Jamb Result are listed below'})
    }).catch(err => {
        res.status(400).send({message:err, success: false})
    })
}

exports.ReadJambResultById = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    JambResult.findAndCountAll({
        where: {
            userId: req.body.userId
        },
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Jamb Result are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

exports.updateJambResult = (req, res) => {
    let jambRes = JSON.parse(req.body.result);
    // console.log(jambRes);

    jambRes.forEach(result => {;
        JambResult.findOne({
            where:{
                userId: req.userId,
                subjectId: result.subjectId
            }
        }).then(res => {
            if(res){
                JambResult.update({
                    // userId: req.userId,
                    // subjectId: result.subjectId,
                    score: result.score
                },
                {
                    where: {
                        userId: req.userId,
                        subjectId: result.subjectId
                    }
                })
            }else {
                JambResult.create({
                    userId: req.userId,
                    subjectId: result.subjectId,
                    score: result.score
                });
            }

        }).catch(err => {
            console.log(err);
        })
    });
    res.status(200).send({result: jambRes, message: 'success'});
   
    // jambRes.forEach((jamb) => {
    //     JambResult.findOne({
    //         where: {
    //             subjectId: req.subjectId
    //         }
    //     }).then(subjectResult => {
    //         if(subjectResult){
    //             JambResult.update({
    //                 subjectId: jamb.subjectId,
    //                 userId: req.userId,
    //                 score: jamb.score
    //             },
    //             {
    //                 where: {
    //                     id: parseInt(subjectResult.id)
    //                 }
    //             }).then(result => {
    //                 res.status(200).send({result: result, success: true, message: 'jamb Result has been updated successfully'})
    //             }).catch(err => {
    //                 res.status(400).send({message:err.message, success: false})
    //             })
    //         } else {
    //             JambResult.create({
    //                 subjectId: jamb.subjectId,
    //                 userId: req.userId,
    //                 score: jamb.score
    //             }).then(result => {
    //                 res.status(200).send({result: result, success: true, message: 'jamb Result has been updated successfully'})
    //             }).catch(err => {
    //                 res.status(400).send({message:err.message, success: false})
    //             })
    //         }
    //     });
    // });
}

exports.deleteJambResult = (req, res) =>{
    JambResult.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Jamb Result has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}