import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  //login Acno
  acno:any
  //to hold transcation array
  transaction:any

  constructor(private ds:DataService) {
    //get login acno from data service
    this.acno = JSON.parse(localStorage.getItem('currentAcno')  || '')
    //get transaction array from data service
     this.ds.getTransaction(this.acno)
    .subscribe((result:any) =>{
      this.transaction = result.transaction

     },
     result=>{
      alert(result.error.message)
     })

   }

  ngOnInit(): void {
  }


}
