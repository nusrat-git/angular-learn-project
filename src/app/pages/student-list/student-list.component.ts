import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-student-list',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  studentForm: FormGroup;
  courseList: string[] = ['Math', 'Science', 'History', 'Geography', 'Art'];

  addStudentForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],

      payment: this.fb.group({
        cardNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(16),
            Validators.maxLength(16),
          ],
        ],
        expiryDate: ['', Validators.required],
      }),

      courses: this.fb.array([], CustomValidators.minLengthArray(1)),
    });
  }

  constructor(private fb: FormBuilder) {
    this.studentForm = this.addStudentForm();
  }

  ngOnInit(): void {}

  get payment(): FormGroup {
    return this.studentForm.get('payment') as FormGroup;
  }

  get courses(): FormArray {
    return this.studentForm.get('courses') as FormArray;
  }

  courseInput = new FormControl('', Validators.required);

  addCourse() {
    if (this.courseInput.valid) {
      this.courses.push(new FormControl(this.courseInput.value));
      this.courseInput.reset();
    }
  }

  removeCourse(index: number) {
    this.courses.removeAt(index);
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
    }
  }
}
