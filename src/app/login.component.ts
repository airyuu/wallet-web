import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';

import { HttpService } from './http.service';
import { LayerService } from './layer.service';

@Component({
  selector:'login-area',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{
  user = new User();
  msg:string = '';
  constructor(
    private httpService:HttpService,
    private layerService:LayerService,
    private router:Router
  ){}
  mobileExg = /^1[34578]\d{9}$/;
  passExg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  submitStatus = false;

  ngOnInit():any{
    
  }

  login(valid1,valid2){
    this.submitStatus = true;
    this.msg = "";
    console.log(valid1,valid2);
    console.log(this.user);
    console.log('username='+this.user.username);
    console.log('password='+this.user.password);
    
    if(valid1 && valid2){
      let loading = this.layerService.loading().setMessage("加载中...");
      this.httpService.login(this.user).then(res => {
        alert(res);
        if(res.status == 200){
          let data = JSON.parse(res._body);
          console.log(data);
          this.httpService.setData(data);
          loading.setMessage("登录成功").close();
          //let tip = this.layerService.tip().setMessage("登录成功");          
          this.router.navigate(['/iconlist']);
        }else{
          this.msg = res._body;
          console.log(this.msg);
          loading.close();
        }
      }).catch(error => error);
    }
  }

}