import {Injectable} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MatchPassword {
  static match(c: AbstractControl) {
    const password = c.get('password')?.value;
    const passwordConfirmation = c.get('passwordConfirmation')?.value;

    if (password === passwordConfirmation) return null;
    else return {passwordsDontMatch: true};
  }
}
