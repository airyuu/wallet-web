import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { IconData } from './icon-data';

import { HttpService } from './http.service';
import { LayerService } from './layer.service';

@Component({
  selector:'icon-list',
  templateUrl:'./set-pay-password.component.html',
  styleUrls:['./login.component.css']
})

export class SetPayPasswordComponent implements OnInit{
  user = new User();
  data = new IconData();
  submitStatus:boolean = false;
  accountID:string = '';
  msg:string = '';
  passExg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

  constructor(
    private router:Router,
    private httpService:HttpService,
    private layerService:LayerService
  ){}

  ngOnInit():any{
    console.log(this.data);
    this.data = this.httpService.getData();
    console.log(this.data);
    this.accountID = this.data.accountID;
    console.log("accountID="+this.accountID);
  }

  setPayPassword(valid1,valid2){
    this.msg = '';
    this.submitStatus = true;
    console.log(valid1,valid2);
    if(valid1 && valid2){
      console.log(this.accountID);
      let loading = this.layerService.loading().setMessage("加载中...");
      this.httpService.setPayPassword(this.accountID,this.user.payPassword).then(
        res => {
          console.log(res);
          if(res.status == 200){
            let data = res._body;
            console.log(data);   //设置成功   
            loading.close();
            this.layerService.tip().setMessage("设置成功");
            this.httpService.iconListData.payPasswordStatus = true;   
            this.router.navigate(['/iconlist']);
          }else{
            this.msg = res._body;
            console.log(this.msg);
            loading.close();
          }
        }
      ).catch(err => console.log(err));
    }
  }
}