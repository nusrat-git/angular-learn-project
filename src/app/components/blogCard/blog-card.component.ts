import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-blog-card',
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    const allBlogs = this.blogService.getBlogs();
  }
}
