import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {UserInfo} from "../../../../types/user-info";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  user: UserInfo | null = null;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private _snackBar:MatSnackBar,
              private router:Router) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLoggedIn();


    if (this.isLogged) {
      this.authService.getUserInfo()
        .subscribe({
          next: (response: UserInfo | DefaultResponseType) => {
            if ('id' in response) {
              this.user = response as UserInfo;
            }
          },

          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              console.log(errorResponse.error.message);
            }

          }
        });
    }
  }

  logout() {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      });
  }

  doLogout():void{
    this.authService.removeToken();
    this.authService.userInfo = null;
    this._snackBar.open('Вы вышли из системы');
    this.refreshPage();
  }

  refreshPage():void {
    this.router.navigate(['/'])
      .then(()=>{
        window.location.reload();
      })
  }
}
