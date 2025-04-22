import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
  selector: 'app-employee-list',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          CustomValidators.uniqueName(),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      position: ['', [Validators.required, Validators.maxLength(15)]],

      department: ['', [Validators.required, Validators.maxLength(10)]],

      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  // employeeForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.maxLength(20)]),

  //   email: new FormControl('', [Validators.required, Validators.email]),

  //   position: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(15),
  //   ]),

  //   department: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(10),
  //   ]),

  //   skills: new FormArray([new FormControl('', [Validators.required])]),
  // });

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }
  }
}
