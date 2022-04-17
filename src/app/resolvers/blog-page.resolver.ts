import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadBlogItemsAction } from '../state/actions/blog.actions';

@Injectable({ providedIn: 'root' })
export class BlogPageResolver implements Resolve<void> {
  constructor(private store: Store) {}

  resolve(): void {
    this.store.dispatch(new LoadBlogItemsAction());
  }
}
