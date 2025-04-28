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
import { DataService } from '../../services/data/data.service';
import { CustomValidators } from '../../validators/custom-validators';
import { MyCustomPipe } from '../../pipes/my-custom.pipe';

@Component({
  selector: 'app-employee-form',
  imports: [NgIf, NgFor, ReactiveFormsModule, MyCustomPipe],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  private id = 1;
  editEmployeeId: string | null = null;
  editMode = false;
  employees: any = [];

  createEmployeeForm(employeeData: any = null): FormGroup {
    return this.fb.group({
      name: [
        employeeData?.name || '',
        [
          Validators.required,
          Validators.maxLength(20),
          CustomValidators.uniqueName(
            this.employees?.map((e: any) => e.name),
            this.editMode
          ),
        ],
      ],

      email: [
        employeeData?.email || '',
        [Validators.required, Validators.email],
      ],

      position: [
        employeeData?.position || '',
        [Validators.required, Validators.maxLength(15)],
      ],

      department: [
        employeeData?.department || '',
        [Validators.required, Validators.maxLength(10)],
      ],

      address: this.fb.group({
        street: [employeeData?.address?.street || '', Validators.required],
        city: [employeeData?.address?.city || '', Validators.required],
        postalCode: [
          employeeData?.address?.postalCode || '',
          Validators.required,
        ],
      }),

      skills: this.fb.array(
        (employeeData?.skills || []).map((skill: any) =>
          this.fb.control(skill)
        ),
        CustomValidators.minLengthArray(1)
      ),
    });
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.employeeForm = this.createEmployeeForm();
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.employees = response;
      this.employeeForm = this.createEmployeeForm();
    });
  }

  get address(): FormGroup {
    return this.employeeForm.get('address') as FormGroup;
  }

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

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

  fetchEmployees() {
    this.dataService.getData().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (err) => {
        console.error('Failed to fetch employees:', err);
      },
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const updatedEmployee = {
        id: this.editMode
          ? this.editEmployeeId?.toString()
          : (this.id++).toString(),
        ...this.employeeForm.value,
      };

      if (this.editMode) {
        this.dataService
          .updateEmployee(this.editEmployeeId, updatedEmployee)
          .subscribe((response) => {
            this.fetchEmployees();
          });
      } else {
        this.dataService.addEmployee(updatedEmployee).subscribe((response) => {
          this.fetchEmployees();
        });
      }

      this.onReset();
      this.editMode = false;
      this.editEmployeeId = null;
    }
  }

  onEditEmployee(id: string) {
    this.editMode = true;
    this.editEmployeeId = id;

    this.dataService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employeeForm = this.createEmployeeForm(employee);
        this.employeeForm.patchValue(employee);
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }

  onDeleteEmployee(id: string) {
    this.dataService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.fetchEmployees();
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }

  onReset() {
    this.employeeForm.reset();
    this.skills.clear();
  }
}
