import {Component, ElementRef, Inject, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss', './popup-adaptive.component.scss']
})
export class PopupComponent implements OnInit {
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

  constructor(
    @Inject(DIALOG_DATA) private data: string,
    private fb: FormBuilder,
    private requestService: RequestService,
    private dialogRef:DialogRef
   ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.footerPopup = true;
    }
    this.popupForm.get('service')?.setValue(this.data);
  }


  completeOrder(type: string) {
    if (this.popupForm.invalid) {
      this.popupForm.markAllAsTouched();
      return;
    }

    const orderData: any = {
      name: this.popupForm.value.name,
      phone: this.popupForm.value.phone,
      type: type
    };

    if (this.popupForm.value.service) {
      orderData.service = this.popupForm.value.service;
    }
    if (this.popupForm.valid && this.popupForm.value.name && this.popupForm.value.phone) {
      this.requestService.makeOrder(this.popupForm.value.name, this.popupForm.value.phone, type, this.popupForm.value.service!)
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
    this.dialogRef.close();
  }
}
