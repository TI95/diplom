import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleType} from "../../../types/article.type";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticlesType} from "../../../types/articles.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleWithCommentType} from "../../../types/article-with-comment.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http:HttpClient) { }

  getBestArticles():Observable<ArticleType[]>{
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  getAllArticles(params?:ActiveParamsType):Observable< ArticlesType>{
    return this.http.get<ArticlesType>(environment.api + 'articles',{
      params:params
    });
  }

  getArticleDetails(url:string):Observable<ArticleWithCommentType>{
    return this.http.get<ArticleWithCommentType>(environment.api + 'articles/' + url);
  }

  getRelatedArticles(url:string):Observable<ArticleType[]>{
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
}
