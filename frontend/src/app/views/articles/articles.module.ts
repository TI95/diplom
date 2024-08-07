import { NgModule } from '@angular/core';
import { ArticlesRoutingModule } from './articles-routing.module';
import {BlogComponent} from "./blog/blog.component";
import {DetailComponent} from "./detail/detail.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    ReactiveFormsModule,


  ]
})
export class ArticlesModule { }
