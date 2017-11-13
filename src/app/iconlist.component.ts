import { Component,OnInit } from '@angular/core';

import { User } from './user';
import { IconData } from './icon-data';

import { HttpService } from './http.service';

@Component({
  selector:'icon-list',
  templateUrl:'./iconlist.component.html',
  styleUrls:['./iconlist.component.css']
})

export class IconlistComponent implements OnInit{
  data = new IconData();

  eth_balance:number = 0.00;
  eth_cny:number = 0.00;
  eth_exchange:number = 0.00;

  btc_balance:number = 0.00;
  btc_cny:number = 0.00;
  btc_exchange:number = 0.00;

  total:number = 0.00;
  moreHintStatus:boolean = false;
  constructor(private httpService:HttpService){}

  ngOnInit():any{
    this.data = this.httpService.getData();
    console.log(this.data);
    this.eth_balance = this.data.eth_balance * Math.pow(10,-18);
    this.eth_cny = parseFloat(this.data.eth_cny);
    this.eth_exchange = this.eth_balance * this.eth_cny;
    this.btc_balance = this.data.btc_balance * Math.pow(10,-8);
    this.btc_cny = parseFloat(this.data.btc_cny);
    this.btc_exchange = this.btc_balance * this.btc_cny;

    this.total = this.eth_exchange + this.btc_exchange;
    console.log(this.eth_balance,this.eth_cny,this.eth_exchange,this.btc_balance,this.btc_cny,this.btc_exchange,this.total);
  }

  toggleRightBar(){
    this.moreHintStatus = !this.moreHintStatus;
  }
}