import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BestArticles} from "../../../types/best-articles";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http:HttpClient) { }

  getBestArticles():Observable<BestArticles[]>{
    return this.http.get<BestArticles[]>(environment.api + 'articles/top');
  }
}
