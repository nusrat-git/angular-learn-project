import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-job-application-form',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './job-application-form.component.html',
  styleUrl: './job-application-form.component.css',
})
export class JobApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;

  @Input() editApplication: any = null;
  @Output() submit = new EventEmitter<any>();

  addApplicationForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', [Validators.required]],
      resume: ['', [Validators.required]],
    });
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.applicationForm = this.addApplicationForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editApplication'] && this.editApplication) {
      this.applicationForm.patchValue(this.editApplication);
    }
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      if (this.editApplication) {
        this.dataService
          .updateApplication(
            this.editApplication.id,
            this.applicationForm.value
          )
          .subscribe((response) => {
            this.submit.emit(response);
          });
      } else {
        this.dataService
          .addApplication(this.applicationForm.value)
          .subscribe((response) => {
            this.submit.emit(response);
          });
      }
      this.applicationForm.reset();
    }
  }
}
