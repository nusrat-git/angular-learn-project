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
import { JobApplicationListComponent } from './pages/job-application-list/job-application-list.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
    path: 'employees/:id',
    component: EmployeeCardComponent,
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
    path: 'job-applications',
    component: JobApplicationListComponent,
  },
  {
    path: 'task-management',
    component: TaskListComponent,
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
