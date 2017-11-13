import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgLayer, NgLayerRef, NgLayerComponent } from "angular2-layer";
import { QRCodeModule } from 'angular2-qrcode';

import { AppRouteringModule } from './app-routering.module';

import { IndexComponent } from './index.component';
import { AppComponent } from './app.component';
import { LoginComponent} from './login.component';
import { RegisterComponent } from './register.component';
import { SetPayPasswordComponent } from './set-pay-password.component';
import { SetPasswordComponent } from './set-password.component';
import { IconlistComponent } from './iconlist.component';
import { IconDetailComponent } from './icon-detail.component';
import { ToEthPipe } from './to-eth.pipe';
import { TransferComponent } from './transfer.component';
import { ReceiveComponent } from './receive.component';

import { HttpService } from './http.service';
import { LayerService } from './layer.service';

//装饰器函数
@NgModule({
  declarations: [
    IndexComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SetPayPasswordComponent,
    SetPasswordComponent,
    IconlistComponent,
    IconDetailComponent,
    NgLayerComponent,
    ToEthPipe,
    TransferComponent,
    ReceiveComponent
  ],//声明属于该模块的组件
  entryComponents:[NgLayerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouteringModule,
    HttpModule,
    QRCodeModule
  ],//引入组件所需的angular组件
  providers: [
    HttpService,
    LayerService,
    NgLayer,
    NgLayerRef,
    ToEthPipe
  ],//导入服务,应用中的所有组件都可以使用该服务
  bootstrap: [AppComponent] //指定根组件
})
export class AppModule { }  //angular根模块
