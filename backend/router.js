const express = require('express');
const router = express.Router();

const connection = require('./database');

router.get('/getemployeeslist', (req,res)=>{
    let sql = `Select * from employeeslist`;
    connection.query(sql, (err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
        res.end();        
    })
})

router.get('/getemployee/:eid', (req,res)=>{
    let eid = req.params.eid;
    let sql = `Select * from employeeslist where eid='${eid}'`;
    connection.query(sql, (err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
        res.end();
    })
})


router.post('/addemployee', (req,res)=>{
    let data = req.body;
    let sql = `Insert into employeeslist SEt?`;
    connection.query(sql, data, (err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
        res.end();
    })
})

router.put('/updateemployee/:eid', (req,res)=>{
    let eid = req.params.eid;
    let data = req.body;
    let sql = `Update employeeslist set fname='${data.fname}', lname='${data.lname}', mobile='${data.mobile}', email='${data.email}',
                dept='${data.dept}', designation='${data.designation}', manager='${data.manager}', city='${data.city}' where eid='${eid}'`;
    connection.query(sql, (err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
        res.end();
    })
})

router.delete('/deleteemployee/:eid', (req,res)=>{
    let eid = req.params.eid;
    let sql = `Delete from employeeslist where eid='${eid}'`;
    connection.query(sql, (err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
        res.end();
    })
})
module.exports = router;