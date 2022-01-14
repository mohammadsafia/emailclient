import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchPassword} from "../validators/match-password";
import {UniqueUsername} from "../validators/unique-username";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [
      // @ts-ignore
      this.uniqueUsername.validate
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
  }, {
    validators: [MatchPassword.match]
  })

  constructor(
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
  ) {
  }

  get showFormErrors() {
    const password = this.authForm.get('password');
    const passwordConfirmation = this.authForm.get('passwordConfirmation');
    const formErrors = this.authForm['errors'];
    return password?.touched && passwordConfirmation?.touched && formErrors
  }

  get formErrorMessage() {
    const errors = this.authForm['errors'];
    if (!errors) return '';

    const passwordsDontMatchError = errors['passwordsDontMatch']
    if (passwordsDontMatchError) return 'Password and Password Confirmation must match';

    const noConnectionError = errors['noConnection']
    if (noConnectionError) return 'No internet connection detected, failed to sign up';

    const unknownErrorError = errors['unknownError']
    if (unknownErrorError) return 'Failed to sign up';

    return ''
  }

  getFormControlsByName(fieldName: string): FormControl {
    return this.authForm.get(fieldName) as FormControl
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    const credentials = this.authForm.value;

    this.authService.signup(credentials).subscribe({
      next: (response) => {

      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({noConnection: true});
        } else {
          this.authForm.setErrors({unknownError: true});
        }
      }
    })
  }
}
