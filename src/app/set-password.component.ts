import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { IconData } from './icon-data';

import { HttpService } from './http.service';
import { LayerService } from './layer.service';

@Component({
  selector:'icon-list',
  templateUrl:'./set-password.component.html',
  styleUrls:['./login.component.css']
})

export class SetPasswordComponent implements OnInit{
  user = new User();
  data = new IconData();
  submitStatus:boolean = false;
  username:string = '';
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
    this.username = this.data.username;
    console.log("username="+this.username);
  }

  setPassword(valid1,valid2){
    this.submitStatus = true;
    this.msg = "";
    console.log(valid1,valid2);
    if(valid1 && valid2){
      console.log(this.username);
      let loading = this.layerService.loading().setMessage("加载中...");
      this.httpService.setPassword(this.username,this.user.password).then(
        res => {
          console.log(res);
          if(res.status == 200){
            let data = res._body;
            console.log(data);   //"OK" 
            loading.close();
            this.layerService.tip().setMessage("设置成功");     
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