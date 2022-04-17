import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogEditPageComponent } from './containers/blog-edit-page.component';
import { BlogPageComponent } from './containers/blog-page.component';
import { BlogEditPageResolver } from './resolvers/blog-edit-page.resolver';
import { BlogPageResolver } from './resolvers/blog-page.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'blog-list', pathMatch: 'full' },
  {
    path: 'blog-list',
    component: BlogPageComponent,
    resolve: { blogPageResolver: BlogPageResolver }
  },
  {
    path: 'blog/:id/edit',
    component: BlogEditPageComponent,
    resolve: { blogPageResolver: BlogEditPageResolver }
  },
  { path: '**', redirectTo: 'blog-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
