import { Component, OnInit } from '@angular/core';

import { BlogItem } from '../../models/blog-item.model';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  blogItems: BlogItem[] = [];
  isDisplayPopup = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogItems();
  }

  getBlogItems(): void {
    this.blogService.getBlogItems().then((blogItems) => {
      this.blogItems = blogItems;
    });
  }

  closePopup() {
    this.isDisplayPopup = false;
  }

  createBlogItem(event: BlogItem) {
    const blogItem = event;

    // Set a new id
    this.blogItems.forEach((item) => {
      if (item.blogId >= blogItem.blogId) {
        blogItem.blogId = item.blogId;
      }
    });
    blogItem.blogId += 1;

    this.blogService.createBlogItem(blogItem);
    this.getBlogItems();
  }
}
