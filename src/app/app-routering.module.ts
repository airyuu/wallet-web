import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';
import { LoginComponent} from './login.component';
import { RegisterComponent } from './register.component';
import { IconlistComponent } from './iconlist.component';
import { IconDetailComponent } from './icon-detail.component';
import { SetPayPasswordComponent } from './set-pay-password.component';
import { SetPasswordComponent } from './set-password.component';
import { TransferComponent } from './transfer.component';
import { ReceiveComponent } from './receive.component';

const routes:Routes = [
  { path:'',      redirectTo:'index', pathMatch:'full' },
  { path:'index',             component:IndexComponent },
  { path:'login',             component:LoginComponent },
  { path:'register',          component:RegisterComponent },
  { path:'iconlist',          component:IconlistComponent },
  { path:'iconDetail/:type',  component:IconDetailComponent },
  { path:'setPayPassword',    component:SetPayPasswordComponent},
  { path:'setPassword',       component:SetPasswordComponent},
  { path:'transfer/:type',    component:TransferComponent},
  { path:'reveive/:type',     component:ReceiveComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRouteringModule {}