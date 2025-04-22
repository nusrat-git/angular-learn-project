import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [NgIf],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  blog: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blog = this.blogService.getBlogById(blogId);
  }
}
