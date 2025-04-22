import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  address = '';

  onSubmit() {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  // this is for reactive

  // registerForm = new FormGroup({
  //   username: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //   ]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', Validators.required),
  // });
  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //   }
  // }
}
