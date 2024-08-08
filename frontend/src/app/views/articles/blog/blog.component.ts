import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticlesType} from "../../../../types/articles.type";
import {environment} from "../../../../environments/environment";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {ActiveParamsUtils} from "../../../shared/utils/active-params.utils";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles!: ArticlesType;
  pages: number[] = [];
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];


  filterOpen = false;
  filterOptions: { name: string, value: string, selected:boolean}[] = [
    {name: 'Фриланс', value: 'frilans', selected:false},
    {name: 'SMM', value: 'smm', selected:false},
    {name: 'Дизайн', value: 'dizain', selected:false},
    {name: 'Таргет', value: 'target' ,selected:false},
    {name: 'Копирайтинг', value: 'kopiraiting', selected:false},
  ];

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.processArticles()
  }

  processArticles() {
        this.activatedRoute.queryParams
          .pipe(
            debounceTime(1000))
          .subscribe(params => {

             this.activeParams = ActiveParamsUtils.processParams(params);

            this.articlesService.getAllArticles(this.activeParams)
              .subscribe((data) => {
                this.pages = [];
                this.articles = data;
                for (let i = 1; i <= data.pages!; i++) {
                  this.pages.push(i);
                }
                this.updateAppliedFilters();
                this.updateFilterOptions();
              });
          })
  }

  updateAppliedFilters() {
    this.appliedFilters = [];
    this.activeParams.categories.forEach(url => {
      let filterName = this.filterOptions.find(option => option.value === url)?.name;
      if (filterName) {
        this.appliedFilters.push({
          name: filterName,
          urlParam: url
        });
      }
    });
  }


  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.appliedFilters = this.appliedFilters.filter(item => item.urlParam !== appliedFilter.urlParam);
    this.activeParams.categories = this.activeParams.categories.filter(category => category !== appliedFilter.urlParam);
    this.activeParams.page = 1;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
    this.updateFilterOptions();

  }

  filters(value: string) {

    const categoryIndex = this.activeParams.categories.indexOf(value);
    if (categoryIndex !== -1) {
      this.activeParams.categories.splice(categoryIndex, 1);
      this.appliedFilters = this.appliedFilters.filter(item => item.urlParam !== value);
    } else {
      this.activeParams.categories = [...this.activeParams.categories,value]
      let filterName = this.filterOptions.find(option => option.value === value)?.name;
      if (filterName) {
        this.appliedFilters.push({
          name: filterName,
          urlParam: value
        });
      }
      const selectedFilter = this.filterOptions.find(option => option.value === value);
      if (selectedFilter) {
        selectedFilter.selected = !selectedFilter.selected;
      }
    }
    this.updateFilterOptions();

    this.router.navigate(['/articles'], {
      queryParams: this.activeParams,
    });



  }

  updateFilterOptions() {
    this.filterOptions.forEach(option => {
      option.selected = this.activeParams.categories.includes(option.value);
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }
}
