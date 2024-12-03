import {Component, OnInit} from '@angular/core';

import {ArticlesService} from "../../shared/services/articles.service";
import {ArticleType} from "../../../types/article.type";

import {Dialog} from "@angular/cdk/dialog";
import {PopupComponent} from "../../shared/components/popup/popup.component";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', './main-adaptive.component.scss']
})

export class MainComponent implements OnInit {
  bestArticles: ArticleType[] = [];


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
    dots: false,
    navSpeed: 900,
    navText: ['', ''],
    responsive:{
      0:{
          items:1,
       
      },
      600:{
          items:2,
         
      },
      1200:{
          items:3,
       
      }
  },
    nav: true
  }

  constructor(private articlesService: ArticlesService,
              private dialog: Dialog,
  ) {
  }


  ngOnInit(): void {
    this.articlesService.getBestArticles()
      .subscribe((data: ArticleType[]) => {
        this.bestArticles = data;
      });

  }

  openModal(value: string) {
    this.dialog.open(PopupComponent, {data: value})
  }
}
