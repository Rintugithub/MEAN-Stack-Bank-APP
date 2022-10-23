import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//global headers
const options ={
  headers : new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {


  constructor(private http:HttpClient) {
   }

  //register
  register(acno: any, password: any, username: any) {
    const data = {
      acno,password,username
    }
   //register api call-asychronuos
  return this.http.post('http://localhost:3000/register',data)

  }
  //login();
  login(acno: any, pswd: any) {
    const data = {
      acno,pswd
    }
   //login api call-asychronuos
  return this.http.post('http://localhost:3000/login',data)


  }
  //to get token and attach into its request header
  getOptions(){
    //fetch the token from localstorage
    const token = JSON.parse(localStorage.getItem('token') || '')
    //to get the header , create an object for Httpheaders
    let headers = new HttpHeaders()
    //append token inside the header
    if(token){
    headers =  headers.append('x-access-token',token)
    //implement overloaded
    options.headers = headers
    }
    return options

  }

  //deposit()
  deposit(acno: any, pswd: any, amt: any) {
    const data = {
      acno,pswd,amt
    }
   //deposit api call-asychronuos
  return this.http.post('http://localhost:3000/deposit',data,this.getOptions())


  }
  //withdraw()
  withdraw(acno: any, pswd: any, amt: any) {
    const data = {
      acno,pswd,amt
    }
   //withdraw api call-asychronuos
  return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())

  }
  //transaction
  getTransaction(acno: any) {
    const data = {
      acno
    }
   //withdraw api call-asychronuos
  return this.http.post('http://localhost:3000/transaction',data,this.getOptions())
  }
  //deleteApi
  delete(acno:any){
  return  this.http.delete('http://localhost:3000/onDelete/'+acno)
  }
}
