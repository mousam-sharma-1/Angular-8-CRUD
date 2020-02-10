import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogUserComponent } from './log-user/log-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {
    path:'signup',component:LogUserComponent
  },
  {
    path:'',component:HomeComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'update',component:UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
