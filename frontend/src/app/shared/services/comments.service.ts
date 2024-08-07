import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {GetCommentsType} from "../../../types/get-comments.type";
import {UserActionsType} from "../../../types/user-actions.type";


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public http: HttpClient,
  ) {


  }

  addComment(commentText: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text: commentText,
      article: article
    })
  }

  getComments(offset: number, article: string): Observable<GetCommentsType> {

    let params = new HttpParams().set('offset', offset).set('article', article);
    return this.http.get<GetCommentsType>(`${environment.api}comments`, {params});
  }


  makeReaction(id: string, action: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {
      action: action
    });
  }

  getAllUserReactions(articleId: string): Observable<UserActionsType | DefaultResponseType> {
    let params = new HttpParams().set('articleId', articleId);
    return this.http.get<UserActionsType | DefaultResponseType>(environment.api + 'comments/article-comment-actions', {params});
  }

  getUserReactions(id:string ):Observable<UserActionsType | DefaultResponseType>{
     return this.http.get<UserActionsType | DefaultResponseType>(environment.api + 'comments/' + id + '/actions');

  }


}


