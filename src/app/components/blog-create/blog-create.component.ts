import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlogItem, buildBlogItem } from '../../models/blog-item.model';

@Component({
  selector: 'blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
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
  isEmptyTitle = false;
  isEmptyContent = false;

  closeComponent() {
    this.onCloseComponent.emit();
  }

  createBlogItem() {
    this.isEmptyTitle = this.blogTitle === '' ? true : false;
    this.isEmptyContent = this.blogContent === '' ? true : false;

    if (!this.isEmptyTitle && !this.isEmptyContent) {
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
}
