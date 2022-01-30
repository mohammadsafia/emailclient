import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label!: string;
  @Input() inputType: string = 'text'
  @Input() control!: FormControl;
  @Input() controlType: 'input' | 'textarea' = 'input'
  get showErrors() {
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors
  }

  get inputControlError(): { message: string } | any {
    const error = {
      message: ''
    }
    const controlErrors = this.control['errors'];

    if (!this.control || !controlErrors) return {message: ''};

    const requiredError = controlErrors['required']
    if (requiredError) {
      error.message = 'Value is required';
    }

    const minLengthError = controlErrors['minlength'];
    if (minLengthError) {
      error.message = InputComponent.minLengthErrorMessage(minLengthError)
    }

    const emailError = controlErrors['email'];
    if (emailError) {
      error.message = 'Enter a valid email'
    }

    const maxLengthError = controlErrors['maxlength'];
    if (maxLengthError) {
      error.message = InputComponent.maxLengthErrorMessage(maxLengthError)
    }

    const patternError = controlErrors['pattern'];
    if (patternError) {
      error.message = 'Invalid format'
    }

    const nonUniqueUsernameError = controlErrors['nonUniqueUsername'];
    if (nonUniqueUsernameError) {
      error.message = 'Username is taken'
    }

    const noConnectionError = controlErrors['noConnection'];
    if (noConnectionError) {
      error.message = 'Cannot tell if username is taken'
    }

    return error
  }

  private static minLengthErrorMessage({actualLength, requiredLength}: IErrorMessage) {
    return ` Value you entered is ${actualLength}  characters long, but it must be at a least
         ${requiredLength}`
  }

  private static maxLengthErrorMessage({actualLength, requiredLength}: IErrorMessage) {
    return ` Value you entered is ${actualLength}  characters long, but it cannot be longer than
         ${requiredLength}`
  }
}

interface IErrorMessage {
  actualLength: number;
  requiredLength: number
}
