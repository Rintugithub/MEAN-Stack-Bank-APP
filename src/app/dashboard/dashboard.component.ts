import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//login username
  user = ""
  //deposit - model
  depositForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
   //deposit - model
   withdrawForm = this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
//acno to child
acno:any
lDate:any



  constructor(private fb:FormBuilder ,private ds:DataService,private router:Router) {
    if(localStorage.getItem('currentUsername')){
      this.user = JSON.parse(localStorage.getItem('currentUsername') || '')

    } 
    this.lDate  = new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('please login')
      this.router.navigateByUrl('')


    }
  }
  deposit(){
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if(this.depositForm.valid){
      //deposit data service-asynchronous
     this.ds.deposit(acno,pswd,amount)
      .subscribe((result:any) =>{


          alert(result.message)
         },
         result=>{
          alert(result.error.message)
         })


      }else{
      alert('Invalid Form');
    }

  }
  withdraw(){
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount
    if(this.withdrawForm.valid){
     this.ds.withdraw(acno,pswd,amount)
      .subscribe((result:any) =>{


        alert(result.message)
       },
       result=>{
        alert(result.error.message)
       })

    }else{
      alert('invalid Form');
    }

  }

//logout
logout(){
  //remove login acno, username
  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUsername')
  localStorage.removeItem('token')


  //navigate to login page
  this.router.navigateByUrl('')


}
//deleteparent()
deleteParent(){
  this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
}
//cancel()- to set acno as empthy
cancel(){
  this.acno = ""
}
//ondelete
onDelete(event:any){
  //asynchronous
  this.ds.delete(event)
  .subscribe(
    (result:any)=>{
      alert(result.message)
this.logout()
},
    result=>{
      alert(result.error.message)
    }
  )

}

}
