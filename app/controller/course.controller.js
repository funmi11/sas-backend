const db = require('../model');
const Course = db.course;

exports.createCourse = (req, res) => {
    Course.create({
        name: req.body.name,
        detail: req.body.detail
    }).then(institution => {
        res.status(200).send({
            success: true,
            result: institution,
            message: 'Course has been created successfully'
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

exports.ReadCourseByName = (req, res) => {
    Course.findAndCountAll({
        where: {
            name: req.body.name
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'course are listed below according to their names'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
};

exports.ReadCourses = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Course.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Course are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

exports.updateCourse = (req, res) => {
    Course.update({
        name: req.body.name,
        faculty: req.body.faculty
    },
    {
        where: {
            id: parseInt(req.body.id)
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'course has been updated successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

exports.deleteCourse = (req, res) =>{
    Course.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Course has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}