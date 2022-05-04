import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { BlogState } from '../state/blog.state';
import { BlogItem, buildBlogItem } from '../models/blog-item.model';
import {
  DeleteBlogItemAction,
  UpdateBlogItemAction
} from '../state/actions/blog.actions';

@Component({
  selector: 'blog-create-page',
  template: `
    <div class="container d-flex flex-column p-3">
      <a
        class="btn btn-secondary align-self-start"
        routerLink="blog-list"
        >Назад</a
      >

      <label class="my-2">Название:</label>
      <input
        class="form-control"
        [(ngModel)]="updatedBlogTitle" />

      <label class="my-2">Содержимое:</label>
      <textarea
        class="form-control"
        [(ngModel)]="updatedBlogContent"
        rows="15"></textarea>
      <div class="d-flex justify-content-between mt-2">
        <button
          class="btn btn-danger"
          (click)="isDisplayPopup = true">
          Удалить
        </button>

        <button
          class="btn btn-success ms-3"
          (click)="updateBlogItem()">
          Сохранить
        </button>
      </div>

      <div
        [class.visually-hidden]="!isDisplayPopup"
        class="delete-popup d-flex flex-column border p-3 bg-light position-absolute">
        <span>Вы точно хотите удалить блог?</span>
        <div class="d-flex justify-content-around mt-3">
          <button
            class="btn btn-danger"
            (click)="deleteBlogItem()">
            Да
          </button>
          <button
            class="btn btn-success"
            (click)="isDisplayPopup = false">
            Нет
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .delete-popup {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `
  ]
})
export class BlogEditPageComponent implements OnInit {
  @Select(BlogState.blogItem)
  blogItem$!: Observable<BlogItem>;

  blogId = 0;
  blogTitle = '';
  blogContent = '';
  updatedBlogTitle = '';
  updatedBlogContent = '';
  isDisplayPopup = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.blogItem$
      .subscribe((blogItem) => {
        this.blogId = blogItem.blogId;
        this.blogTitle = blogItem.blogTitle;
        this.blogContent = blogItem.blogContent;
        this.updatedBlogTitle = blogItem.blogTitle;
        this.updatedBlogContent = blogItem.blogContent;
      })
      .unsubscribe();
  }

  updateBlogItem() {
    if (
      this.blogTitle !== this.updatedBlogTitle ||
      this.blogContent !== this.updatedBlogContent
    ) {
      this.store.dispatch(
        new UpdateBlogItemAction(
          buildBlogItem({
            blogId: this.blogId,
            blogTitle: this.updatedBlogTitle,
            blogContent: this.updatedBlogContent
          })
        )
      );
    }
    this.router.navigate(['/blog-list']);
  }

  deleteBlogItem() {
    this.store.dispatch(new DeleteBlogItemAction(this.blogId));
    this.router.navigate(['/blog-list']);
  }
}
