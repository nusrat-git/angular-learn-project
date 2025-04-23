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
import { EmployeeCardComponent } from '../../components/employee-card/employee-card.component';

@Component({
  selector: 'app-employee-list',
  imports: [ReactiveFormsModule, NgIf, NgFor, EmployeeCardComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employeeForm: FormGroup;

  employees: any[] = [
    {
      id: 0,
      name: 'nusrat',
      email: 'nusrat@gmail.com',
      position: 'developer',
      department: 'biznify',
      skills: ['html', 'js'],
    },
  ];

  private id = 1;
  editEmployeeId: number | null = null;
  editMode = false;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          CustomValidators.uniqueName(this.employees.map((e) => e.name)),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      position: ['', [Validators.required, Validators.maxLength(15)]],

      department: ['', [Validators.required, Validators.maxLength(10)]],

      // skills: this.fb.array([this.fb.control('', Validators.required)]),

      skills: this.fb.array([], CustomValidators.minLengthArray(1)),
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

  // addSkill() {
  //   this.skills.push(new FormControl('', Validators.required));
  // }

  skillInput = new FormControl('', Validators.required);
  addSkill() {
    if (this.skillInput.valid) {
      this.skills.push(new FormControl(this.skillInput.value));
      this.skillInput.reset();
    }
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // onSubmit() {
  //   if (this.employeeForm.valid) {
  //     const newEmployee = {
  //       id: this.id++,
  //       ...this.employeeForm.value,
  //     };

  //     this.employees.push(newEmployee);
  //     this.employeeForm.reset();
  //     this.skills.clear();
  //   }
  // }

  onSubmit() {
    if (this.employeeForm.valid) {
      const updatedEmployee = {
        id: this.editMode ? this.editEmployeeId : this.id++,
        ...this.employeeForm.value,
      };

      if (this.editMode) {
        this.employees = this.employees.map((emp) =>
          emp.id === this.editEmployeeId ? updatedEmployee : emp
        );
      } else {
        this.employees.push(updatedEmployee);
      }

      this.employeeForm.reset();
      this.skills.clear();
      // this.skillInput.reset();
      this.editMode = false;
      this.editEmployeeId = null;
    }
  }

  onEditEmployee(id: number) {
    this.editMode = true;
    this.editEmployeeId = id;

    const employee = this.employees.find((emp) => emp.id === id);
    if (employee) {
      this.employeeForm.patchValue({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
      });

      this.skills.clear();

      employee.skills.forEach((skill: string) => {
        this.skills.push(new FormControl(skill));
      });
    }
  }

  onDeleteEmployee(id: number) {
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }

  onReset() {
    this.employeeForm.reset();
    this.skills.clear();
  }
}
