import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import { TermsComponent } from './terms/terms.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    TermsComponent,


  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserModule { }
