import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../services/request.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {PopupService} from "../../services/popup.service";
import {of} from "rxjs";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  dialogRef: MatDialogRef<any> | null = null;
  options: string[] = ['Фриланс', 'Продвижение', 'Реклама', 'Копирайтинг'];
  orderCompleteResponseError = false;
  showOrderCompletedText = false;
  @ViewChild('popup') popup!: TemplateRef<ElementRef>
   footerPopup = false;

  popupForm = this.fb.group({
    service: [''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  })

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private requestService: RequestService,
              private popupService: PopupService) {
  }

  ngOnInit(): void {

    this.popupService.open$.subscribe((value:string) => {
      if(value === ''){
        this.footerPopup = true;
      }
      this.dialogRef = this.dialog.open(this.popup);
      this.popupForm.get('service')?.setValue(value);
      this.dialogRef.backdropClick().subscribe(() => {
        this.closePopup();
      });
    });
  }



  completeOrder(type:string) {
    if (this.popupForm.invalid) {
      this.popupForm.markAllAsTouched();
      return;
    }
    if (this.popupForm.valid && this.popupForm.value.name && this.popupForm.value.phone && this.popupForm.value.service ) {
      this.requestService.makeOrder(this.popupForm.value.name, this.popupForm.value.phone, type, this.popupForm.value.service)
        .subscribe({
            next: (response: DefaultResponseType) => {
              if (!response.error) {
                this.showOrderCompletedText = true;
              }

            },
            error: ((response: DefaultResponseType) => {
              if (response.error) {
                this.orderCompleteResponseError = true;
              }
            })
          }
        )
    }
  }

  closePopup() {
    this.dialogRef!.close()
    this.showOrderCompletedText = false;
    this.popupForm.reset();
    this.popupForm.markAsPristine();
    this.footerPopup = false;

  }
}
