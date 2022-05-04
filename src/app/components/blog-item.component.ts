import { Component, Input } from '@angular/core';
import { BlogItem } from '../models/blog-item.model';

@Component({
  selector: 'blog-item',
  template: `
    <div class="d-flex flex-column blog-item mt-3 ms-4">
      <div class="fw-bold text-center">{{ blogItem.blogTitle }}</div>
      <div class="blog-item-content border p-2 my-2">
        {{ blogItem.blogContent }}
      </div>
      <a
        [routerLink]="['../blog', blogItem.blogId, 'edit']"
        class="btn btn-light"
        >Перейти</a
      >
    </div>
  `,
  styles: [
    `
      .blog-item {
        width: 200px;
        min-height: 140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
      }
      .blog-item-content {
        min-height: 100px;
      }
    `
  ]
})
export class BlogItemComponent {
  @Input() blogItem!: BlogItem;
}
