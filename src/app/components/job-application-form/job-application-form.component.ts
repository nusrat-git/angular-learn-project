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
import { CustomValidators } from '../../validators/custom-validators';

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
    const form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', [Validators.required]],
      resume: ['', []],
    });

    if (!this.editApplication?.resume) {
      form.get('resume')?.setValidators([Validators.required]);
    }

    return form;
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.applicationForm = this.addApplicationForm();
  }

  ngOnInit(): void {}

  fileError: string | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      this.fileError = 'Please upload a PDF file.';
      return;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applicationForm = this.addApplicationForm();

    if (changes['editApplication'] && this.editApplication) {
      // this.applicationForm.patchValue(this.editApplication);

      this.applicationForm.patchValue({
        name: this.editApplication.name,
        email: this.editApplication.email,
        position: this.editApplication.position,
      });
    }
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      if (this.editApplication) {
        this.dataService
          .updateApplication(this.editApplication.id, {
            ...this.applicationForm.value,
            resume:
              this.applicationForm.value.resume === ''
                ? this.editApplication?.resume
                : this.applicationForm.value.resume,
          })
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
      this.editApplication = null;
    }
  }
}
