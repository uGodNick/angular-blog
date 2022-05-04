import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlogItem, buildBlogItem } from '../models/blog-item.model';

@Component({
  selector: 'blog-create',
  template: `
    <div
      class="create-popup d-flex flex-column border p-3 bg-light position-absolute"
      [class.visually-hidden]="!isDisplayComponent">
      <label class="mb-2">Название:</label>
      <input
        class="form-control"
        [(ngModel)]="blogTitle" />
      <label class="my-2">Содержимое:</label>
      <textarea
        class="form-control"
        [(ngModel)]="blogContent"></textarea>
      <div class="d-flex justify-content-end mt-3">
        <button
          class="btn btn-danger"
          (click)="closeComponent()">
          Отмена
        </button>
        <button
          class="btn btn-success ms-3"
          (click)="createBlogItem()">
          Сохранить
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .create-popup {
        width: 500px;
        top: 150px;
        left: 50%;
        transform: translateX(-50%);
      }

      textarea {
        resize: none;
      }
    `
  ]
})
export class BlogCreateComponent {
  @Input()
  isDisplayComponent = false;

  @Output()
  onCloseComponent = new EventEmitter<void>();
  @Output()
  onCreateBlogItem = new EventEmitter<BlogItem>();

  blogTitle = '';
  blogContent = '';

  closeComponent() {
    this.onCloseComponent.emit();
  }

  createBlogItem() {
    const newBlogItem = buildBlogItem({
      blogId: 0,
      blogTitle: this.blogTitle,
      blogContent: this.blogContent
    });

    this.onCreateBlogItem.emit(newBlogItem);
    this.blogTitle = '';
    this.blogContent = '';
    this.closeComponent();
  }
}
