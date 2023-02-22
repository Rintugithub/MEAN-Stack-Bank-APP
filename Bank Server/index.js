//1.server creation
const { response } = require('express');
const express = require('express');
//import jsonwebtoken
const jwt = require("jsonwebtoken");
//import cors
const cors = require('cors')
const dataService = require('./service/data.sevice');
//2.create a server app
const app = express();
//to parse JSON
app.use(express.json())
//to use cors to share data with other
app.use(cors({
    origin:['http://localhost:4200', 'http://192.168.15.109:8080', 'http://127.0.0.1:8080']
}))
//router specific middleware- token validate
const jwtMiddleware = (req,res,next)=>{
  try { const token = req.headers['x-access-token']
   const data = jwt.verify(token,"supersecretkey12345")
    console.log(data);
    next() }
    catch{
        res.status(422).json({
            statusCode:422,
                status:false,
                message:'Please Log In'
        })
    }
}

//3.HTTP request resolve

//Bank APP REQUEST RESOLVING
//register api
app.post('/register',(req,res)=>{
dataService.register(req.body.acno,req.body.password,req.body.username)
.then(result=>{
    res.status(result.statusCode).json(result)

})
})
//login api
app.post('/login',(req,res)=>{
 dataService.login(req.body.acno,req.body.pswd)
 .then(result=>{
    res.status(result.statusCode).json(result)


    })    })
    //deposit api
app.post('/deposit',jwtMiddleware,(req,res)=>{
  dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
   .then(result=>{
        res.status(result.statusCode).json(result)

    })    })
    //withdraw api

app.post('/withdraw',jwtMiddleware,(req,res)=>{
 dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })     })
     //transaction api

app.post('/transaction',jwtMiddleware,(req,res)=>{
  try  { const result = dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)

    }) }
    catch{
        res.status(422).json({
            statusCode:422,
                status:false,
                message:'No transaction has been done'
        })
    }
    })
    //ondeleteapi
    app.delete('/onDelete/:acno',(req,res)=>{
        dataService.onDelete(req.params.acno)
        .then(result=>{
            res.status(result.statusCode).json(result)

        })

    })


//4.set up port number
app.listen(3000,()=>{
    console.log('server started at port 3000');
})



