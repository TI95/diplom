import { Component, OnInit } from '@angular/core';
import {PopupComponent} from "../../components/popup/popup.component";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor( private dialog: Dialog,) { }

  ngOnInit(): void {
  }


  openModal(value: string) {
    this.dialog.open(PopupComponent, {data:value})
  }

}
