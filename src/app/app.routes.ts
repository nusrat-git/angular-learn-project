import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogListComponent } from './pages/blogList/blog-list.component';
import { BlogDetailComponent } from './pages/blogDetail/blog-detail.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'blogs',
    component: BlogListComponent,
  },
  {
    path: 'blogs/:id',
    component: BlogDetailComponent,
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/admin/admin.routes').then((m) => m.adminRoutes),
  },
];
