import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {LoginResponseType} from "../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^([А-ЯЁ][а-яё]*)( [А-ЯЁ][а-яё]*)*$/) ]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) ]],
    agree: [false, [Validators.requiredTrue]],
  })
  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private _snackbar:MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {

  }
  openInNewWindow(url: string) {
    window.open(url, '_blank');
  }

  signup(){
    if(this.signupForm.valid && this.signupForm.value.email  && this.signupForm.value.password
      && this.signupForm.value.name && this.signupForm.value.agree){
      this.authService.signup( this.signupForm.value.name, this.signupForm.value.email,this.signupForm.value.password )
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message
            }
            const signupResponse = data as LoginResponseType;
            if (!signupResponse.accessToken || !signupResponse.refreshToken || !signupResponse.userId) {
              error = 'Ошибка авторизации';
            }

            if (error) {
              this._snackbar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(signupResponse.accessToken, signupResponse.refreshToken);
            this.authService.userId = signupResponse.userId;
            this._snackbar.open('Вы успешно зарегистрировались\'');
            this.router.navigate(['/'])


          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackbar.open(errorResponse.error.message);
            } else {
              this._snackbar.open('Ошибка  регистрации');
            }
          }
        });
    }
  }
}
