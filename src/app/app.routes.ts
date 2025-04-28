import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogListComponent } from './pages/blogList/blog-list.component';
import { BlogDetailComponent } from './pages/blogDetail/blog-detail.component';
import { authGuard } from './guards/auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { EventPlannerListComponent } from './pages/event-planner-list/event-planner-list.component';

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
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'students',
    component: StudentListComponent,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
  {
    path: 'event-planner',
    component: EventPlannerListComponent,
  },
  {
    path: 'registration',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/admin/admin.routes').then((m) => m.adminRoutes),
  },
];
