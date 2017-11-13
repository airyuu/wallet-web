import { Component } from '@angular/core';

@Component({
  selector:'index-area',
  templateUrl:'./index.component.html',
  styleUrls:['./index.component.css']
})

export class IndexComponent {
  title = '袋鼠钱包';
  logoUrl = '../assets/logo.png';
}