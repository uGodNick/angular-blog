import { Component, Input } from '@angular/core';
import { BlogItem } from '../../models/blog-item.model';

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent {
  @Input() blogItem!: BlogItem;
}
