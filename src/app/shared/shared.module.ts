import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupComponent} from "./components/popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [PopupComponent]
})
export class SharedModule { }
