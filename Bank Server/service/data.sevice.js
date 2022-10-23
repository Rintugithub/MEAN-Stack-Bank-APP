//import jsonwebtoken
const jwt = require("jsonwebtoken");
//import db 
const db = require('./db')
//database
userDetials  = {
1000: { acno: 1000, username: "Neer", password: 1000, balance: 5000, transaction: [] },
1001: { acno: 1001, username: "Laisha", password: 1001, balance: 6000, transaction: [] },
1002: { acno: 1002, username: "Vyom", password: 1002, balance: 4000, transaction: [] }

  }                            

//Register
  
  const register =  (acno , password ,username )=> {
    //asynchronus function call
   return db.User.findOne({acno})
   .then(user=>{
    if(user){
      return{
               statusCode:401,
                status:false,
                message:'User already exist .. Please Log In'
      }
    }
    else{
      const newUser = new db.User({
        acno,
        username,
        password,
        balance:0,
        transaction: []
      })
      newUser.save()
      return {
        statusCode:200,
        status:true,
        message:"Successfully Register"
      }
    }
   })
  
    
    }
    //login
   const login = (acno , pswd )=> {

  // asynchronous
  return db.User.findOne({
    acno,
    password:pswd
  })
  .then(user =>{
    if(user){
      currentUsername = user.username
      currentAcno = acno
      
      //token generation using jwt
      const token = jwt.sign({
        currentAcno:acno 
      },"supersecretkey12345")
      return  {
          statusCode:200,
  
          status:true,
          message:'Login successfully',
          currentUsername,
          currentAcno,
          token

        }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'incorrect account number /password'
      }
    }
  })
       
      }
      //deposit
const deposit =(acno , pswd , amt )=> {
    var amount = parseInt(amt)
     // asynchronous
  return db.User.findOne({
    acno,
    password:pswd
  })
  .then(user=>{
    if(user){
      user.balance += amount

      user['transaction'].push({
        type: 'CREDIT',
        amount: amount
      })
      user.save()

      return  {
          statusCode:200,
          status:true,
          message:`${amount} credited. New Balance is ${user.balance}`
        } 

    }
    else {
      return {
          statusCode:401,
          status:false,
          message:'incorrect password or Account number'
        } 
    }

  })
    
  }
  //withdraw
   const withdraw = (acno, pswd, amt) =>{
    var amount = parseInt(amt)
     // asynchronous
  return db.User.findOne({
    acno,
    password:pswd
  })
  .then(user=>{
    if(user){
      if(user.balance>amount){
        user.balance -= amount

        user['transaction'].push({
          type: 'DEBIT',
          amount: amount
        })
        user.save()
  
        return  {
            statusCode:200,
            status:true,
            message:`${amount} debited. New Balance is ${user.balance}`
          } 
  

      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'insufficent balance'
        }
      }
    
    }
    else {
      return {
          statusCode:401,
          status:false,
          message:'incorrect password or Account number'
        } 
    }

  })
    
  }
  //transaction
   const getTransaction = (acno)=> {
    return db.User.findOne({acno})
    .then(user=>{ 
      if(user){
      return  {
      statusCode:200,

      status:true,
      transaction:user['transaction']
    } 

  }
  else{
    return {
      statusCode:401,
      status:false,
      message:'incorrect  Account number'
    } 
  }
    })
   
  }
  //onDelete
  const onDelete = (acno)=>{
    return db.User.deleteOne({acno})
    .then(result =>{
      if(result){
        return  {
          statusCode:200,
    
          status:true,
          message:'Deleted Successfully'
        } 
    
      
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'incorrect  Account number'
        } 
      }

    })
  }
    //to export
    module.exports = {
        register,
        login,
        deposit,
        withdraw,
        getTransaction,
        onDelete

    }

