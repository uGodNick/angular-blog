import { Injectable } from '@angular/core';
import { blogDb } from '../db/blog.db';
import { BlogItem, buildBlogItem } from '../models/blog-item.model';

@Injectable()
export class BlogService {
  getBlogItems = async (): Promise<BlogItem[]> => {
    const blogItems = blogDb.map((blogItem) => {
      return buildBlogItem(blogItem);
    });

    return blogItems;
  };

  getBlogItem = async (blogId: number): Promise<BlogItem> => {
    let blogItem = undefined;
    for (let i = 0; i < blogDb.length; i++) {
      blogDb[i].blogId === blogId ? (blogItem = blogDb[i]) : null;
    }

    if (blogItem === undefined) {
      throw new Error('The blog with the specified id does not exist');
    } else {
      return blogItem;
    }
  };

  deleteBlogItem = async (blogId: number): Promise<void> => {
    blogDb.map((blogItem, index) => {
      if (blogItem.blogId === blogId) {
        blogDb.splice(index, 1);
      }
    });
  };

  createBlogItem = async (blogItem: BlogItem): Promise<void> => {
    blogDb.push(blogItem);
  };

  updateBlogItem = async (updatedBlogItem: BlogItem): Promise<void> => {
    for (let i = 0; i < blogDb.length; i++) {
      if (blogDb[i].blogId === updatedBlogItem.blogId) {
        blogDb[i] = updatedBlogItem;
      }
    }
  };
}
