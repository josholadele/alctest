var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
// var db = mongojs('mongodb://josh:josh@ds145128.mlab.com:45128/joshmeandb',['todos']); 
var db = mongojs('mongodb://josh:josh@ds231715.mlab.com:31715/alcskool',['students']); 
 
//Get All Students
router.get('/students',function(req,res,next){
    db.students.find(function(err, students){
        if(err){
            res.send(err);
        }else{
            res.json(students);
        }
    })
    // res.send('STUDENT APIs');
});

router.get('/',function(req,res,next){
    res.send('STUDENT APIs');
});

//Get Student by id
router.get('/student/:id',function(req,res,next){
    db.students.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, student){
        if(err){
            res.send(err);
        }else{
            res.json(student);
        }
    });
    // res.send('STUDENT APIs');
});

//Save Student
router.post('/student', function(req,res,next){
    var student = req.body;
    if(!student.firstName || !(student.lastName)|| !(student.class)|| !(student.gender)){
        res.status(400)
        res.json({
            "error": "Invalid Data"
        })
    }else{
        db.students.save(student, function(err, result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        })
    }
})

//Update Student
router.put('/student/:id', function(req,res,next){
    var student = req.body;
    var updObj = {};

    if(!student.firstName || !(student.lastName)|| !(student.class)|| !(student.gender)){
        res.status(400)
        res.json({
            "error": "Invalid Data"
        })
    }else{
        db.students.update({
            _id: mongojs.ObjectId(req.params.id)
        }, student,{},function(err, result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        })
    }
})

//Delete Student
router.delete('/student/:id', function(req,res,next){
    db.students.remove({
        _id: mongojs.ObjectId(req.params.id)
    },1,function(err, result){
                if(err){
                    res.send(err);
                }else{
                    res.json(result);
                }
            });
});

module.exports = router;