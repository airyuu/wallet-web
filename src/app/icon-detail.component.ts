import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from './user';
import { IconData,Txrefs } from './icon-data';

import { HttpService } from './http.service';
import { LayerService } from './layer.service';
import { ToEthPipe } from './to-eth.pipe';

@Component({
  selector:'icon-detail',
  templateUrl:'./icon-detail.component.html',
  styleUrls:['./icon-detail.component.css']
})

export class IconDetailComponent implements OnInit{
  data = new IconData();
  txrefs:Txrefs[] = [];
  type:string = '';
  logoUrl:string = '../assets/eth.png';

  balance:number = 0.00;    //btc或eth余额
  cny:number = 0.00;        //人民币汇率
  exchange:number = 0.00;   //换算成人民币余额

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
    if(this.type == 'eth'){
      this.balance = this.data.eth_balance * Math.pow(10,-18);
      this.cny = parseFloat(this.data.eth_cny);
      this.exchange = this.balance * this.cny;
      for(let i in this.data.eth_txrefs){
        this.txrefs.push(this.data.eth_txrefs[i]);
      }
      console.log(this.txrefs);
    }else if(this.type == 'btc'){
      this.logoUrl = '../assets/btc.png';
      this.balance = this.data.btc_balance * Math.pow(10,-8);
      this.cny = parseFloat(this.data.btc_cny);
      this.exchange = this.balance * this.cny;
      for(let i in this.data.btc_txrefs){
        this.txrefs.push(this.data.btc_txrefs[i]);
      }
      console.log(this.txrefs);
    }else{
      console.log('参数错误');
    }
  }

  transfer():void{
    console.log(this.type);
    this.router.navigate(['/transfer',this.type]);
  }

  receive():void{
    console.log(this.type);
    this.router.navigate(['/reveive',this.type]);
  }
  goback(){
    this.location.back();
  }
}