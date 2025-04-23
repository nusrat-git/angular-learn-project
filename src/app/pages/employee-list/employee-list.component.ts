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
import { EmployeeCardComponent } from '../../components/employee-card/employee-card.component';
import { DataService } from '../../services/data/data.service';
import { MyCustomPipe } from '../../pipes/my-custom.pipe';
import { CustomAttributeDirective } from '../../directives/custom-attribute.directive';

@Component({
  selector: 'app-employee-list',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    EmployeeCardComponent,
    MyCustomPipe,
    CustomAttributeDirective,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employeeForm: FormGroup;
  private id = 1;
  editEmployeeId: string | null = null;
  editMode = false;
  employees: any = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],

      email: ['', [Validators.required, Validators.email]],

      position: ['', [Validators.required, Validators.maxLength(15)]],

      department: ['', [Validators.required, Validators.maxLength(10)]],

      // skills: this.fb.array([this.fb.control('', Validators.required)]),

      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', [Validators.required]],
      }),

      skills: this.fb.array([], CustomValidators.minLengthArray(1)),
    });
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.employees = response;
      this.employeeForm.get('name')?.setValidators([
        Validators.required,
        Validators.maxLength(20),
        CustomValidators.uniqueName(
          this.employees?.map((e: any) => e.name),
          this.editMode
        ),
      ]);

      this.employeeForm.get('name')?.updateValueAndValidity();
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

  get address(): FormGroup {
    return this.employeeForm.get('address') as FormGroup;
  }

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
        // this.employees = this.employees?.map((emp: any) =>
        //   emp.id === this.editEmployeeId ? updatedEmployee : emp
        // );

        this.dataService
          .updateEmployee(this.editEmployeeId, updatedEmployee)
          .subscribe((response) => {
            this.fetchEmployees();
            // this.employees = this.employees.map((emp: any) =>
            //   emp.id === this.editEmployeeId ? response : emp
            // );
          });
      } else {
        this.dataService.addEmployee(updatedEmployee).subscribe((response) => {
          this.fetchEmployees();
        });
      }

      this.onReset();
      // this.skillInput.reset();
      this.editMode = false;
      this.editEmployeeId = null;
    }
  }

  onEditEmployee(id: string) {
    this.editMode = true;
    this.editEmployeeId = id;

    this.dataService.getEmployee(id).subscribe({
      next: (employee) => {
        console.log('Employee fetched:', employee);
        this.employeeForm.patchValue(employee);

        this.skills.clear();

        employee?.skills.forEach((skill: string) => {
          this.skills.push(new FormControl(skill));
        });
      },
      error: (err) => {
        console.error(err.message);
      },
    });

    // const employee = this.employees?.find((emp: any) => emp.id === id);
    // if (employee) {
    //   this.employeeForm.patchValue({
    //     name: employee?.name,
    //     email: employee?.email,
    //     position: employee?.position,
    //     department: employee?.department,
    //     address: employee?.address,
    //   });

    //   this.skills.clear();

    //   employee?.skills.forEach((skill: string) => {
    //     this.skills.push(new FormControl(skill));
    //   });
    // }
  }

  onDeleteEmployee(id: string) {
    // this.employees = this.employees?.filter((emp: any) => emp.id !== id);

    this.dataService.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log(response);
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
