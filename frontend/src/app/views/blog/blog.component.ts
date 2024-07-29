import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../shared/services/articles.service";
import {Articles} from "../../../types/articles";
import {environment} from "../../../environments/environment";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../types/applied-filter.type";
import {ActiveParamsUtils} from "../../shared/utils/active-params.utils";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles!: Articles
  serverStaticPath = environment.serverStaticPath;
  pages: number[] = [];
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];

  filterOpen = false;
  filterOptions: { name: string, value: string }[] = [
    {name: 'Фриланс', value: 'frilans'},
    {name: 'SMM', value: 'smm'},
    {name: 'Дизайн', value: 'dizain'},
    {name: 'Таргет', value: 'target'},
    {name: 'Копирайтинг', value: 'kopiraiting'},

  ]


  constructor(private articlesService: ArticlesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

     this.processArticles();


  }

  processArticles() {

      this.articlesService.getAllArticles(this.activeParams)
      .subscribe((data) => {
        this.pages = [];
        this.articles = data;
        for (let i = 1; i <= data.pages!; i++) {
          this.pages.push(i);
          this.activatedRoute.queryParams
            .pipe(
              debounceTime(500)
            )

           .subscribe(params => {
             this.activeParams = ActiveParamsUtils.processParams(params);

             this.appliedFilters = [];
              this.activeParams.categories.forEach(url => {

                for (let i = 0; i < this.articles.items.length; i++) {
                  this.articles.items.find(article => {
                    if(article.category === 'Фриланс' && url === 'frilans'){
                      this.appliedFilters.push({
                        name: 'Фриланс',
                        urlParam: 'frilans'
                      });

                    }
                    if(article.category === 'SMM' && url === 'smm'){
                      this.appliedFilters.push({
                        name: 'SMM',
                        urlParam: 'smm'
                      });

                    }
                    if(article.category === 'Дизайн' && url === 'dizain'){
                      this.appliedFilters.push({
                        name: 'SMM',
                        urlParam: 'dizain'
                      });

                    }
                    if(article.category === 'Таргет' && url === 'target'){
                      this.appliedFilters.push({
                        name: 'Таргет',
                        urlParam: 'target'
                      });

                    }
                    if(article.category === 'Копирайтинг' && url === 'kopiraiting'){
                      this.appliedFilters.push({
                        name: 'Копирайтинг',
                        urlParam: 'kopiraiting'
                      });
                    }
                  });
                 /* if (foundArticle) {

                  }*/
                }
              });
            /* if (this.activeParams.frilans) {
               this.appliedFilters.push({
                 name: 'Фриланс',
                 urlParam: 'frilans'
               });
             }
             if (this.activeParams.smm) {
               this.appliedFilters.push({
                 name: 'SMM',
                 urlParam: 'smm'
               });
             }
             if (this.activeParams.dizain) {
               this.appliedFilters.push({
                 name: 'Дизайн',
                 urlParam: 'dizain'
               });
             }
             if (this.activeParams.target) {
               this.appliedFilters.push({
                 name: 'Таргет',
                 urlParam: 'target'
               });
             }

             if (this.activeParams.kopiraiting) {
               this.appliedFilters.push({
                 name: 'Копирайтинг',
                 urlParam: 'kopiraiting'
               });
             }*/
            })
        }
      })
  }


  toggleFilter() {
    this.filterOpen = !this.filterOpen;

  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.appliedFilters = this.appliedFilters.filter(item => item.urlParam !== appliedFilter.urlParam);

    // Удаляем соответствующую категорию из activeParams.categories
    this.activeParams.categories = this.activeParams.categories.filter(category => category !== appliedFilter.urlParam);

    // Обновляем параметры запроса
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });

    // Выполняем дополнительную обработку статей
    this.processArticles();

  }


  sort(value: string) {
    this.activeParams.page = 1;

    // Проверка, если категория уже существует, то удаляем её, иначе добавляем
    const categoryIndex = this.activeParams.categories.indexOf(value);
    if (categoryIndex !== -1) {
      this.activeParams.categories.splice(categoryIndex, 1);
      // Удаляем соответствующий фильтр
      this.appliedFilters = this.appliedFilters.filter(item => item.urlParam !== value);
    } else {
      this.activeParams.categories.push(value);
      // Добавляем соответствующий фильтр
      switch (value) {
        case 'frilans':
          this.appliedFilters.push({
            name: 'Фриланс',
            urlParam: 'frilans'
          });
          break;
        case 'smm':
          this.appliedFilters.push({
            name: 'SMM',
            urlParam: 'smm'
          });
          break;
        case 'dizain':
          this.appliedFilters.push({
            name: 'Дизайн',
            urlParam: 'dizain'
          });
          break;
        case 'target':
          this.appliedFilters.push({
            name: 'Таргет',
            urlParam: 'target'
          });
          break;
        case 'kopiraiting':
          this.appliedFilters.push({
            name: 'Копирайтинг',
            urlParam: 'kopiraiting'
          });
          break;
      }
    }

    console.log(this.appliedFilters);
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }


  openPage(page: number) {

    this.activeParams.page = page;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
    this.processArticles();

  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
      this.processArticles();

    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
      this.processArticles();

    }
  }
}
