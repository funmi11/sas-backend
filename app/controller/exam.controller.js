const db =  require('../model');
const Exam = db.exam;

exports.createExam = (req, res) => {
    // console.log(req);
    Exam.create({
        userId: req.userId,
        registringNo: req.body.registrationNo,
        examName: req.body.examName,
        examYear: req.body.examYear
    }).then(result => {
        res.status(200).send({
            success: true,
            message: "Exam record created successfully",
            result: result
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.getExams = (req, res) => {
    Exam.findAndCountAll(
        {
            where: {
                userId: req.userId
            }
        }
    ).then(result => {
        res.status(200).send(
            {
                success: true,
                result: result,
                message: "Exams fetch successfully"
            }
        )
    }).catch(err => {
        console.log(err);
    })
}