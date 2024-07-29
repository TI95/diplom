import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './shared/layouts/footer/footer.component';
import {HeaderComponent} from './shared/layouts/header/header.component';
import {LayoutComponent} from './shared/layouts/layout.component';
import {MainComponent} from './views/main/main.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

 import {SharedModule} from "./shared/shared.module";
import { BlogComponent } from './views/blog/blog.component';


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        LayoutComponent,
        MainComponent,
        BlogComponent,


    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,

  ],


  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
