import { Injectable } from '@angular/core';
import { Headers,Http } from '@angular/http';

import { User } from './user';
import { IconData } from './icon-data';

import 'rxjs/add/operator/toPromise';
import "rxjs/Rx";

@Injectable()

export class HttpService {
  private headers = new Headers({'Content-Type':'application/json','Access-Control-Allow-Origin': '*'});
  private url = 'http://localhost:8089';
  private loginUrl = 'http://localhost:8089/login';
  iconListData = new IconData();

  constructor(private http:Http){}

  setData(data):void{
    this.iconListData = data;
  }

  getData(){
    return this.iconListData;
  }

  getIndex():Promise<any>{
    return this.http.get(this.url).toPromise().then(res => console.log(res)).catch(error => this.handleError);
  }

  login(user:User):Promise<any> {
    let requestData = JSON.stringify({username:user.username,password:user.password});
    console.log(requestData);
    return this.http.post(this.url+'/login',requestData)
             .toPromise()
             .then(res => res)
             .catch(err => err);
  }

  register(user:User):Promise<any>{
    let requestData = JSON.stringify({username:user.username,password:user.password});
    console.log(requestData);
    return this.http.post(this.url+'/register',requestData,{headers:this.headers})
             .toPromise()
             .then(res => res)
             .catch(err => err);
  }

  setPayPassword(accountID,payPassword):Promise<any>{
    let requestData = JSON.stringify({accountID:accountID,payPassword:payPassword});
    console.log(requestData);
    return this.http.post(this.url+'/setPayPassword',requestData,{headers:this.headers})
             .toPromise()
             .then(res => res)
             .catch(err => err);
  }

  setPassword(username,password):Promise<any>{
    let requestData = JSON.stringify({username:username,password:password});
    console.log(requestData);
    return this.http.post(this.url+'/resetPassword',requestData,{headers:this.headers})
             .toPromise()
             .then(res => res)
             .catch(err => err);
  }

  transfer_eth(accountID,payPassword,address_input,address_output,value):Promise<any>{
    let requestData = JSON.stringify({
      accountID:accountID,
      payPassword:payPassword,
      address_input:address_input,
      address_output:address_output,
      value:value
    });
    console.log(requestData);
    return this.http.post(this.url+'/signature/eth',requestData,{headers:this.headers})
              .toPromise()
              .then(res => res)
              .catch(err => err);
  }

  private handleError(error:any):Promise<any>{
    console.log('error:',error);
    return Promise.reject(error.message || error);
  }
}