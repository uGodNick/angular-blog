import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { BlogState } from '../state/blog.state';
import { BlogItem } from '../models/blog-item.model';
import { CreateBlogItemAction } from '../state/actions/blog.actions';

@Component({
  selector: 'blog-page',
  template: `
    <header class="container-fluid d-flex justify-content-center mt-3">
      <h1>Блог</h1>
    </header>

    <div class="container position-relative">
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-primary mt-2"
          (click)="isDisplayPopup = true">
          Добавить
        </button>
      </div>

      <div class="d-flex flex-wrap">
        <blog-item
          *ngFor="let blogItem of blogItems$ | async"
          [blogItem]="blogItem"></blog-item>
      </div>

      <blog-create
        [isDisplayComponent]="isDisplayPopup"
        (onCloseComponent)="closePopup()"
        (onCreateBlogItem)="createBlogItem($event)"></blog-create>
    </div>
  `
})
export class BlogPageComponent {
  @Select(BlogState.blogItems)
  blogItems$!: Observable<BlogItem[]>;

  isDisplayPopup = false;

  constructor(private store: Store) {}

  closePopup() {
    this.isDisplayPopup = false;
  }

  createBlogItem(event: BlogItem) {
    const blogItem = event;

    // Set a new id
    this.blogItems$
      .subscribe((blogItems) => {
        blogItems.forEach((item) => {
          if (item.blogId >= blogItem.blogId) {
            blogItem.blogId = item.blogId;
          }
        });
      })
      .unsubscribe();
    blogItem.blogId += 1;

    this.store.dispatch(new CreateBlogItemAction(blogItem));
  }
}
