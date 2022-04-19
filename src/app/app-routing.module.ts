import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogEditPageComponent } from './containers/blog-edit-page/blog-edit-page.component';
import { BlogPageComponent } from './containers/blog-page/blog-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'blog-list', pathMatch: 'full' },
  {
    path: 'blog-list',
    component: BlogPageComponent
  },
  {
    path: 'blog/:id/edit',
    component: BlogEditPageComponent
  },
  { path: '**', redirectTo: 'blog-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
