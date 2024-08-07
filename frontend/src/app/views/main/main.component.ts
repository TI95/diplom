import {Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticlesService} from "../../shared/services/articles.service";
import {BestArticlesType} from "../../../types/best-articles.type";
import {environment} from "../../../environments/environment";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
 import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../shared/services/request.service";
 import {PopupService} from "../../shared/services/popup.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  bestArticles: BestArticlesType[] = [];
  serverStaticPath = environment.serverStaticPath;

  OwlOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 900,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  reviewsCustomOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 900,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  constructor(private articlesService: ArticlesService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private requestService: RequestService,
              private popupService: PopupService) {}


  ngOnInit(): void {
    this.articlesService.getBestArticles()
      .subscribe((data: BestArticlesType[]) => {
        this.bestArticles = data;
      });

  }

  openModal(value: string) {
    this.popupService.openModal(value);
  }
}
