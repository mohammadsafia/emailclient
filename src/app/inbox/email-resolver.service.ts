import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Email} from "@inbox/email";
import {EMPTY, Observable} from "rxjs";
import {EmailService} from "@inbox/email.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email> | Promise<Email> | Email {
    const {id} = route.params;
    return this.emailService.getEmail(id).pipe(
        catchError(() => {
          this.router.navigateByUrl('/inbox/not-found')
          return EMPTY;
        })
    );
  }
}
