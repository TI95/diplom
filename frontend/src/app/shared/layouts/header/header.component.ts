import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {concatMap, EMPTY, of} from "rxjs";
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatMenuTrigger} from '@angular/material/menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-adaptive.component.scss']
})

export class HeaderComponent implements OnInit {
  
  isLogged: boolean = false;
  user!: UserInfoType
  activeFragment: string | null = null;
  showMobileNumber: boolean = true;
  showNavigationMenu:boolean = true;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private _snackBar:MatSnackBar,
              private router:Router,
              private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
   /* const windowWidth = (event.target as Window).innerWidth;
    this.showMobileNumber = windowWidth >= 1440;

    
    this.showNavigationMenu = windowWidth >= 886; */
   
  }

  ngOnInit(): void {
    this.authService.isLogged$.pipe(
      concatMap(isLogged => {
        if(isLogged){
          this.isLogged = isLogged;
          return this.authService.getUserInfo()
        }
        return EMPTY;
      })
    ).subscribe({
      next: (response: UserInfoType | DefaultResponseType) => {
        if (response && 'id' in response) {
          this.user = response as UserInfoType;
        }
      },

      error: (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          console.log(errorResponse.error.message);
        }
      }
    })

    const showNumberBreakpoint = '(min-width: 1440px)';
    const showNavigationMenuBreakpoint = '(min-width: 886px)';

    this.breakpointObserver.observe([showNumberBreakpoint])
    .subscribe(result => {
      this.showMobileNumber = result.matches;
    });

    this.breakpointObserver.observe([showNavigationMenuBreakpoint])
    .subscribe(result => {
      this.showNavigationMenu = result.matches;
    });


     this.route.fragment.subscribe(fragment => {
      this.activeFragment = fragment;
    });

    

  }

  menuOpen() {
    this.trigger.openMenu();
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

