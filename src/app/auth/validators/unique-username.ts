import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbstractControl, AsyncValidator} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(
    private auth: AuthService
  ) {
  }

  validate = (control: AbstractControl) => {
    const {value} = control;
    return this.auth.usernameAvailable(value).pipe(
      map((value) => {
        if (value.available) {
          return null
        }
        return null
      }),
      catchError((err) => {
        if (err.error.username)
          return of({nonUniqueUsername: true})
        else
          return of({noConnection: true})
      })
    )
  }
}
