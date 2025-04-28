import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { NgFor } from '@angular/common';
import { JobApplicationFormComponent } from '../../components/job-application-form/job-application-form.component';

@Component({
  selector: 'app-job-application-list',
  imports: [NgFor, JobApplicationFormComponent],
  templateUrl: './job-application-list.component.html',
  styleUrl: './job-application-list.component.css',
})
export class JobApplicationListComponent {
  applications: any = [];

  selectedApplication: any = null;

  constructor(private dataService: DataService) {}

  fetchApplications() {
    this.dataService.getApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
      },
      error: (err) => {
        console.error('Failed to fetch applications:', err);
      },
    });
  }

  ngOnInit(): void {
    this.fetchApplications();
  }

  onApplicationSubmit(data: any) {
    if (data) {
      this.fetchApplications();
    }
  }

  onEditApplication(application: any) {
    this.selectedApplication = application;
  }

  onDeleteApplication(id: string) {
    this.dataService.deleteApplication(id).subscribe({
      next: (response) => {
        this.fetchApplications();
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
