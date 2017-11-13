import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';

import { User } from './user';
import { IconData,Txrefs } from './icon-data';
import { Transfer } from './transfer';

import { HttpService } from './http.service';
import { LayerService } from './layer.service';
import { ToEthPipe } from './to-eth.pipe';

@Component({
  selector:'transfer',
  templateUrl:'./receive.component.html',
  styleUrls:['./receive.component.css']
})

export class ReceiveComponent implements OnInit{
  data = new IconData();
  type:string = '';
  address:string = '';

  constructor(
    private httpService:HttpService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private layerService:LayerService,
    private toEth:ToEthPipe,
    private location:Location,
    private qrcode:QRCodeModule
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.type = params.type;
    });
    this.data = this.httpService.getData();
    console.log(this.data);
    if(this.type == 'eth'){
      this.address = this.data.eth_address;
    }else if(this.type == 'btc'){
      this.address = this.data.btc_address;
    }else{
      console.log('参数错误');
    }

  }
}