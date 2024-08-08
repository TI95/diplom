import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  user!: UserInfoType
  activeFragment: string | null = null;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private _snackBar:MatSnackBar,
              private router:Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLoggedIn();
    this.route.fragment.subscribe(fragment => {
      this.activeFragment = fragment;
    });


    if (this.isLogged) {
      this.authService.getUserInfo()
        .subscribe({
          next: (response: UserInfoType | DefaultResponseType) => {
            if ('id' in response) {
              this.user = response as UserInfoType;
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

  setActiveFragment(fragment: string) {
    this.activeFragment = fragment;
  }

  isActiveFragment(fragment: string): boolean {
    return this.activeFragment === fragment;
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

