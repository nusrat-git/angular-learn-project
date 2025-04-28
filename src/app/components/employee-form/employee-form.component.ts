import { NgFor, NgIf } from '@angular/common';
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

  @Input() editEmployee: any = null;
  @Input() editMode: boolean = false;
  @Input() employees: any = [];
  @Output() submit = new EventEmitter<any>();

  createEmployeeForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          CustomValidators.uniqueName(
            this.employees?.map((e: any) => e.name),
            this.editMode
          ),
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
        (this.editEmployee?.skills || []).map((skill: any) =>
          this.fb.control(skill)
        ),
        CustomValidators.minLengthArray(1)
      ),
    });
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.employeeForm = this.createEmployeeForm();
  }

  ngOnInit(): void {}

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

  ngOnChanges(changes: SimpleChanges): void {
    this.employeeForm = this.createEmployeeForm();

    if (changes['editEmployee'] && this.editEmployee) {
      this.employeeForm.patchValue(this.editEmployee);
    }
  }

  onReset() {
    this.employeeForm.reset();
    this.skills.clear();
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.editEmployee) {
        this.dataService
          .updateEmployee(this.editEmployee.id, this.employeeForm.value)
          .subscribe((response) => {
            this.submit.emit(response);
            this.editEmployee = null;
            this.editMode = false;
          });
      } else {
        this.dataService
          .addEmployee(this.employeeForm.value)
          .subscribe((response) => {
            this.submit.emit(response);
          });
      }

      this.onReset();
    }
  }
}
