import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { BlogPageComponent } from './containers/blog-page/blog-page.component';
import { BlogEditPageComponent } from './containers/blog-edit-page/blog-edit-page.component';

import { BlogService } from './service/blog.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogPageComponent,
    BlogItemComponent,
    BlogCreateComponent,
    BlogEditPageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
