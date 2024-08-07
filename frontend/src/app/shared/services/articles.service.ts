import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BestArticlesType} from "../../../types/best-articles.type";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticlesType} from "../../../types/articles.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleType} from "../../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http:HttpClient) { }

  getBestArticles():Observable<BestArticlesType[]>{
    return this.http.get<BestArticlesType[]>(environment.api + 'articles/top');
  }

  getAllArticles(params?:ActiveParamsType):Observable< ArticlesType>{
    return this.http.get<ArticlesType>(environment.api + 'articles',{
      params:params
    });
  }

  getArticleDetails(url:string):Observable<ArticleType>{
    return this.http.get<ArticleType>(environment.api + 'articles/' + url);
  }

  getRelatedArticles(url:string):Observable<BestArticlesType[]>{
    return this.http.get<BestArticlesType[]>(environment.api + 'articles/related/' + url);
  }
}
