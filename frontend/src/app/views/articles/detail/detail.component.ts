import {Component, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {ArticlesService} from "../../../shared/services/articles.service";
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentsService} from "../../../shared/services/comments.service";

import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GetCommentsType} from "../../../../types/get-comments.type";
import {BestArticlesType} from "../../../../types/best-articles.type";
import {UserActionsType} from "../../../../types/user-actions.type";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  detailedArticle!: ArticleType;
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean = false;
  safeHtmlContent!: SafeHtml;
  submitComment = false;
  moreArticleComments!: GetCommentsType;
  offset: number = 3;
  articleHasComments = false;
  relatedArticles: BestArticlesType[] = [];
  userActions: UserActionsType = [];
  userAction: UserActionsType = [];
  isLoadingComments: boolean = false;

  form = this.fb.group({
    textValue: ['', [Validators.required]]
  });

  constructor(private articlesService: ArticlesService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private commentServices: CommentsService,
              private _snackbar: MatSnackBar,
              private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLoggedIn();
    this.getDetailArticleData();
    this.getRelatedArticle();


  }

  getRelatedArticle() {
    this.activatedRoute.params.subscribe(params => {
      this.articlesService.getRelatedArticles(params['url'])
        .subscribe((data: BestArticlesType[]) => {
          this.relatedArticles = data;
        })
    });
  }

  getDetailArticleData() {
    this.activatedRoute.params.subscribe(params => {
      this.articlesService.getArticleDetails(params['url'])
        .subscribe((data: ArticleType) => {
          this.detailedArticle = data;
          this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.detailedArticle.text);
          this.detailedArticle.comments = this.formatCommentsDates(this.detailedArticle.comments);
          if (this.detailedArticle.commentsCount > 3) {
            this.articleHasComments = true;
          }
          this.allUserReactions()
        });
    })

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  formatCommentsDates(comments: ArticleType['comments']): ArticleType['comments'] {
    return comments.map(comment => {
      if(!comment.isDateFormatted)
      comment.date = this.formatDate(comment.date);
      comment.isDateFormatted = true;
      return comment;
    });
  }

  addComment() {
    this.submitComment = true;
    if (this.form.valid && this.form.value.textValue) {
      this.commentServices.addComment(this.form.value.textValue, this.detailedArticle.id)
        .subscribe(() => {
          this.form.reset();
          this.submitComment = false;
        });
    }
    this.offset = 3
    this.getDetailArticleData();
    this.showComments(0);
  }


  showComments(offset: number) {
    if (this.detailedArticle.commentsCount > 3 && this.detailedArticle.commentsCount > this.offset) {
      this.loaderService.show();
    }
    if (this.offset < this.detailedArticle.commentsCount || this.offset === this.detailedArticle.commentsCount) {
      this.commentServices.getComments(this.offset, this.detailedArticle.id)
        .subscribe(comments => {
          this.moreArticleComments = comments
          if (this.moreArticleComments && this.moreArticleComments.comments) {
            this.detailedArticle.comments = [
              ...(this.detailedArticle.comments || []),
              ...this.moreArticleComments.comments
            ];
            this.detailedArticle.comments = this.formatCommentsDates(this.detailedArticle.comments);
          }

          if (offset > 0) {
            this.offset += offset;
          }
          if (this.detailedArticle.commentsCount < this.offset || this.detailedArticle.commentsCount === 0) {
            this.articleHasComments = false;
          }
          this.loaderService.hide();
        });
    }
    this.allUserReactions();
  }


  makeReaction(id: string, action: string) {
    const currentOffset = this.offset;
    this.commentServices.makeReaction(id, action)
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (!data.error) {
            if (action !== 'violate') {
              this._snackbar.open('Ваш голос учтен')
              this.getUserReactions(id)
            } else {
              this._snackbar.open('Жалоба отправлена')
            }

            this.offset = currentOffset;
          }
        },
        error: (error: DefaultResponseType) => {
          if (action === 'violate') {
            this._snackbar.open('Жалоба уже отправлена')
          } else {
            throw new Error(error.message);
          }
        }
      });
  }

  allUserReactions() {
    this.commentServices.getAllUserReactions(this.detailedArticle.id)
      .subscribe((userActionsResponse: UserActionsType | DefaultResponseType) => {
        if ((userActionsResponse as DefaultResponseType).error !== undefined) {
          throw new Error((userActionsResponse as DefaultResponseType).message);
        }
        this.userActions = userActionsResponse as UserActionsType;
        this.userActions.forEach(userAction => {
          const matchingComment = this.detailedArticle.comments.find(comment => comment.id === userAction.comment);
          if (matchingComment) {
            if (userAction.action === 'like') {
              matchingComment.likeColor = '#709FDC';
            } else if (userAction.action === 'dislike') {
              matchingComment.dislikeColor = '#709FDC';
            }
          }
        });
      });

  }

  getUserReactions(commentId: string) {
    this.commentServices.getUserReactions(commentId)
      .subscribe((response: UserActionsType | DefaultResponseType) => {
        if ((response as DefaultResponseType).error !== undefined) {
          throw new Error((response as DefaultResponseType).message);
        }
        this.userAction = response as UserActionsType;
        if (this.userAction.length === 0) {
          const matchingComment = this.detailedArticle.comments.find(comment => comment.id === commentId);
          if (matchingComment) {
            this.resetCommentReaction(matchingComment);
          }
        } else {
          this.userAction.forEach(userAction => {
            const matchingComment = this.detailedArticle.comments.find(comment => comment.id === userAction.comment);
            if (matchingComment) {
              this.updateCommentReaction(matchingComment, userAction.action);
            }
          });
        }
      });
  }

  updateCommentReaction(comment: any, action: string) {
    if (action === 'like') {
      if (comment.likeColor === '#709FDC') {
        comment.likeColor = '#071739';
        comment.likesCount -= 1;
      } else {
        comment.likeColor = '#709FDC';
        comment.likesCount += 1;
        if (comment.dislikeColor === '#709FDC') {
          comment.dislikeColor = '#071739';
          comment.dislikesCount -= 1;
        }
      }
    } else if (action === 'dislike') {
      if (comment.dislikeColor === '#709FDC' || comment === []) {
        comment.dislikeColor = '#071739';
        comment.dislikesCount -= 1;
      } else {
        comment.dislikeColor = '#709FDC';
        comment.dislikesCount += 1;
        if (comment.likeColor === '#709FDC') {
          comment.likeColor = '#071739';
          comment.likesCount -= 1;
        }
      }
    }


  }

  resetCommentReaction(comment: any) {
    if (comment.likeColor === '#709FDC') {
      comment.likeColor = '#071739';
      comment.likesCount -= 1;
    } else if (comment.dislikeColor === '#709FDC') {
      comment.dislikeColor = '#071739';
      comment.dislikesCount -= 1;
    }
  }

}
