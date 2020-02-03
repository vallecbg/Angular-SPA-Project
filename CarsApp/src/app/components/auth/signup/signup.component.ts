import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [ Validators.required, Validators.minLength(6)] ],
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      birthDate: [null, Validators.required],
    });
  }

  signup() {
    const { email, password, birthDate, name, mobile } = this.signupForm.value;

    this.authService.signUp(email, password, birthDate, name, mobile);
  }

}
