import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { MyCustomPipe } from '../../pipes/my-custom.pipe';
import {
  Employee,
  EmployeeService,
} from '../../services/employee/employee.service';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-employee-form',
  imports: [NgIf, NgFor, ReactiveFormsModule, MyCustomPipe, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});

  selectedEmployee$!: Observable<Employee | null>; // Observable for edit employee
  employees$!: Observable<Employee[]>;
  isModalOpen$!: Observable<boolean>;

  createEmployeeForm(): FormGroup {
    return this.fb.group({
      name: [
        ,
        [
          Validators.required,
          Validators.maxLength(20),
          // CustomValidators.uniqueName(this.employees$),
          // ...(this.employeeService.selectedEmployeeSubject.getValue()
          //   ? []
          //   : [CustomValidators.uniqueName(this.employees$)]),
          // ...(this.employeeService.editEmployee
          //   ? []
          //   : [
          //       CustomValidators.uniqueName(
          //         this.employees?.map((e: any) => e.name)
          //       ),
          //     ]),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      position: ['', [Validators.required, Validators.maxLength(15)]],

      department: ['', [Validators.required, Validators.maxLength(10)]],

      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
      }),

      skills: this.fb.array(
        [].map((skill: any) => this.fb.control(skill)),
        CustomValidators.minLengthArray(1)
      ),
    });
  }

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private modalService: ModalService
  ) {
    // this.employeeForm = this.createEmployeeForm();
  }

  ngOnInit(): void {
    this.employeeForm = this.createEmployeeForm();

    // this.employees$ = this.employeeService.employees$;
    this.selectedEmployee$ = this.employeeService.selectedEmployee$;
    this.isModalOpen$ = this.modalService.modalState$;

    // this.employeeForm = this.createEmployeeForm();

    this.selectedEmployee$.subscribe((emp) => {
      if (emp) {
        this.employeeForm.patchValue(emp);

        const skills = this.employeeForm.get('skills') as FormArray;
        emp.skills.forEach((skill) => skills.push(this.fb.control(skill)));
      }
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

  onReset() {
    this.employeeForm.reset();
    this.skills.clear();
  }

  closeModal() {
    this.modalService.closeModal();
    this.onReset();
    this.employeeService.setEditEmployee(null);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const currentEmployee =
        this.employeeService.selectedEmployeeSubject.getValue();

      if (currentEmployee) {
        this.employeeService.updateEmployee(
          currentEmployee.id,
          this.employeeForm.value
        );
      } else {
        this.employeeService.addEmployee({
          ...this.employeeForm.value,
          created: new Date().toISOString().split('T')[0],
        });
      }

      this.modalService.closeModal();
    }
  }
}
