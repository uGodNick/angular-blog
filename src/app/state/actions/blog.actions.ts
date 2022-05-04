import { BlogItem } from 'src/app/models/blog-item.model';

export class LoadBlogItemsAction {
  static readonly type = '[Blog List Page] Get Blog List';
  constructor() {}
}

export class LoadBlogItemAction {
  static readonly type = '[Blog Item Page] Get Blog Item';
  constructor(public id: number) {}
}

export class DeleteBlogItemAction {
  static readonly type = '[Blog Delete Item Page] Delete Blog Item';
  constructor(public id: number) {}
}

export class CreateBlogItemAction {
  static readonly type = '[Blog Page] Create Blog Item';
  constructor(public blogItem: BlogItem) {}
}

export class UpdateBlogItemAction {
  static readonly type = '[Blog Update Item Page] Update Blog Item';
  constructor(public blogItem: BlogItem) {}
}
