import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { BlogItem } from '../models/blog-item.model';
import { BlogService } from '../service/blog.service';
import {
  LoadBlogItemsAction,
  LoadBlogItemAction,
  DeleteBlogItemAction,
  CreateBlogItemAction,
  UpdateBlogItemAction
} from './actions/blog.actions';

export interface BlogStateModel {
  loadedBlogItems: BlogItem[];
  loadedBlogItemToEdit: BlogItem;
}

const BLOG_STATE_TOKEN = new StateToken<BlogStateModel>('blog');

@State<BlogStateModel>({
  name: BLOG_STATE_TOKEN,
  defaults: {
    loadedBlogItems: [],
    loadedBlogItemToEdit: {
      blogId: 0,
      blogTitle: '',
      blogContent: ''
    }
  }
})
@Injectable()
export class BlogState {
  @Selector()
  static blogItems(state: BlogStateModel) {
    return state.loadedBlogItems;
  }

  @Selector()
  static blogItem(state: BlogStateModel) {
    return state.loadedBlogItemToEdit;
  }

  constructor(private blogService: BlogService) {}

  @Action(LoadBlogItemsAction)
  loadBlogItems(ctx: StateContext<BlogStateModel>) {
    this.blogService
      .getBlogItems()
      .then((blogItems) =>
        ctx.setState({ ...ctx.getState(), loadedBlogItems: blogItems })
      );
  }

  @Action(LoadBlogItemAction)
  loadBlogItem(ctx: StateContext<BlogStateModel>, action: LoadBlogItemAction) {
    this.blogService
      .getBlogItem(action.id)
      .then((blogItem) =>
        ctx.setState({ ...ctx.getState(), loadedBlogItemToEdit: blogItem })
      );
  }

  @Action(DeleteBlogItemAction)
  deleteBlogItems(
    ctx: StateContext<BlogStateModel>,
    action: DeleteBlogItemAction
  ) {
    this.blogService.deleteBlogItem(action.id);
    this.loadBlogItems(ctx);
  }

  @Action(CreateBlogItemAction)
  createBlogItem(
    ctx: StateContext<BlogStateModel>,
    action: CreateBlogItemAction
  ) {
    this.blogService.createBlogItem(action.blogItem);
    this.loadBlogItems(ctx);
  }

  @Action(UpdateBlogItemAction)
  upateBlogItem(
    ctx: StateContext<BlogStateModel>,
    action: UpdateBlogItemAction
  ) {
    this.blogService.updateBlogItem(action.blogItem);
    this.loadBlogItems(ctx);
  }
}
