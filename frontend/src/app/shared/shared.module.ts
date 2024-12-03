import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupComponent} from "./components/popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './components/loader/loader.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [PopupComponent, LoaderComponent, LoaderComponent, ArticleCardComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,


  ],
  exports: [ CommonModule, LoaderComponent, ArticleCardComponent]
})
export class SharedModule { }
