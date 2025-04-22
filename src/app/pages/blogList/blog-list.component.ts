import { Component, OnInit } from '@angular/core';
import { BlogCardComponent } from '../../components/blogCard/blog-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, BlogCardComponent, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogs = this.blogService.getBlogs();
  }
}
