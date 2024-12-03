import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss', './article-card-adaptive.components.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input () article!: ArticleType;
  serverStaticPath = environment.serverStaticPath;
  constructor() { }

  ngOnInit(): void {
  }

}
