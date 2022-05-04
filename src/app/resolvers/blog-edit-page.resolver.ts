import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadBlogItemAction } from '../state/actions/blog.actions';

@Injectable({ providedIn: 'root' })
export class BlogEditPageResolver implements Resolve<void> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): void {
    const blogId = parseInt(route.params['id'], 10);

    this.store.dispatch(new LoadBlogItemAction(blogId));
  }
}
