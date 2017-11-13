import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from './user';
import { IconData,Txrefs } from './icon-data';
import { Transfer } from './transfer';

import { HttpService } from './http.service';
import { LayerService } from './layer.service';
import { ToEthPipe } from './to-eth.pipe';

@Component({
  selector:'transfer',
  templateUrl:'./transfer.component.html',
  styleUrls:['./icon-detail.component.css']
})

export class TransferComponent implements OnInit{
  data = new IconData();
  txrefs:Txrefs[] = [];
  type:string = '';
  payPasswordStatus:boolean = false;
  logoUrl:string = '../assets/eth.png';

  submitStatus:boolean = false;
  accountID:string = '';
  msg:string = '';
  passExg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  valExg = /^\d+(\.{0,1}\d+){0,1}$/;

  balance:number = 0.00;    //btc或eth余额
  address:string = '';      //btc或eth地址
  cny:number = 0.00;        //人民币汇率
  exchange:number = 0.00;   //换算成人民币余额

  //表单字段
  transfer = new Transfer();

  constructor(
    private httpService:HttpService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private layerService:LayerService,
    private toEth:ToEthPipe,
    private location:Location
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.type = params.type;
    });
    this.data = this.httpService.getData();
    console.log(this.data);
    this.accountID = this.data.accountID;
    this.payPasswordStatus = this.data.payPasswordStatus;
    if(this.type == 'eth'){
      this.balance = this.data.eth_balance * Math.pow(10,-18);
      this.address = this.data.eth_address;
    }else if(this.type == 'btc'){
      this.logoUrl = '../assets/btc.png';
      this.balance = this.data.btc_balance * Math.pow(10,-8);
      this.address = this.data.btc_address;
    }else{
      console.log('参数错误');
    }
    if(this.payPasswordStatus == false){
      let confirm = this.layerService.confirm().setMessage("还未设置支付密码，是否去设置？").setOkText("yes").setCancelText("no");
      console.log(confirm);
      confirm.ok(()=>{
        this.router.navigate(['/setPayPassword']);
        return true;
      })
    }
  }

  save():void{
    this.submitStatus = true;
    this.msg = '';
    console.log(this.transfer);
    console.log(this.accountID,this.address,this.type);    
    if(this.type == 'eth'){
      let loading = this.layerService.loading().setMessage("加载中...");
      this.httpService.transfer_eth(this.accountID,this.transfer.paypa,this.address,this.transfer.add,this.transfer.val*Math.pow(10,18)).then(res => {
        console.log(res);
        if(res.status == 200){
          let data = res._body;
          console.log(data);    
          loading.close();
          this.layerService.tip().setMessage("转账成功");
          this.router.navigate(['/iconlist']);
        }else{
          this.msg = res._body;
          if(res._body.indexOf('error')>=0){
            this.msg = JSON.parse(res._body).error
          }
          console.log(this.msg);
          loading.close();
        }
      }).catch(err => {
        console.log(err);
        loading.close();
      });
    }else{
      this.layerService.tip().setMessage("BTC暂不支持转账功能");
    }
    
  }

  goback(){
    this.location.back();
  }
}