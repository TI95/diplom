import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private openSubject = new Subject<string>();
  open$ = this.openSubject.asObservable();

  openModal(value:string){
    this.openSubject.next(value);
  }
}
