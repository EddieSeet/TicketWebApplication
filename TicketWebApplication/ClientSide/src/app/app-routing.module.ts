import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './Ticket/ticket/ticket.component';
import { HomeComponent } from './home/home/home.component';
import {AuthGuardService} from "./auth/auth-guard.service"
import { SummaryComponent } from './summary/summary/summary.component';
import { AuthGuardAdmService } from './auth/auth-guard-adm.service';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  {path:"Ticket" ,
  //canActivate:[AuthGuardService],
   component:TicketComponent},
   
   {path:"Summary" ,
   canActivate:[AuthGuardAdmService],
    component:SummaryComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
