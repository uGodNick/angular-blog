import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogItem, buildBlogItem } from '../../models/blog-item.model';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'blog-create-page',
  templateUrl: './blog-edit-page.component.html',
  styleUrls: ['./blog-edit-page.component.scss']
})
export class BlogEditPageComponent implements OnInit {
  blogItem: BlogItem = {
    blogId: 0,
    blogTitle: '',
    blogContent: ''
  };
  updatedBlogTitle = '';
  updatedBlogContent = '';
  isDisplayPopup = false;
  isEmptyTitle = false;
  isEmptyContent = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => {
        this.blogService
          .getBlogItem(parseInt(params['id'], 10))
          .then((blogItem) => {
            this.blogItem = blogItem;
            this.updatedBlogTitle = blogItem.blogTitle;
            this.updatedBlogContent = blogItem.blogContent;
          });
      })
      .unsubscribe();
  }

  updateBlogItem() {
    this.isEmptyTitle = this.updatedBlogTitle === '' ? true : false;
    this.isEmptyContent = this.updatedBlogContent === '' ? true : false;

    if (!this.isEmptyTitle && !this.isEmptyContent) {
      if (
        this.blogItem.blogTitle !== this.updatedBlogTitle ||
        this.blogItem.blogContent !== this.updatedBlogContent
      ) {
        this.blogService.updateBlogItem(
          buildBlogItem({
            blogId: this.blogItem.blogId,
            blogTitle: this.updatedBlogTitle,
            blogContent: this.updatedBlogContent
          })
        );
      }
      this.router.navigate(['/blog-list']);
    }
  }

  deleteBlogItem() {
    this.blogService.deleteBlogItem(this.blogItem.blogId);
    this.router.navigate(['/blog-list']);
  }
}
