import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor() {}

  private blogs = [
    {
      id: 0,
      title: 'Angular Basics',
      content: 'This is Angular basics content.',
    },
    {
      id: 1,
      title: 'Routing in Angular',
      content: 'Routing allows navigation between views.',
    },
    {
      id: 2,
      title: 'Services and DI',
      content: 'Services help you share logic across components.',
    },
  ];

  getBlogs() {
    return this.blogs;
  }

  getBlogById(id: number) {
    return this.blogs.find((blog) => blog.id === id);
  }
}
