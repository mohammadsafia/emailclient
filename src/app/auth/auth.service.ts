import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    signedin$ = new BehaviorSubject<any>(null)
    private readonly apiEndPoint = 'https://api.angular-email.com/auth'

    constructor(private http: HttpClient) {
    }

    usernameAvailable(username: string) {
        return this.http.post<UsernameAvailableResponse>(`${this.apiEndPoint}/username`, {
            username
        })
    }

    signup(credentials: SignupCredentials) {
        return this.http.post<SignupResponse>(`${this.apiEndPoint}/signup`, credentials).pipe(tap(() => {
            this.signedin$.next(true);
        }))
    }

    checkAuth() {
        return this.http.get<SignedInResponse>(`${this.apiEndPoint}/signedin`).pipe(
            tap(({authenticated}) => {
                this.signedin$.next(authenticated);
            })
        )
    }

    signOut() {
        return this.http.post(`${this.apiEndPoint}/signout`, {}).pipe(
            tap(() => {
                this.signedin$.next(false);
            })
        );
    }

    signin(credentials: SigninCredentials) {
        return this.http.post(`${this.apiEndPoint}/signin`, credentials).pipe(
            tap(()=> {
                this.signedin$.next(true);
            })
        )
    }
}

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
    username: string;
    password: string;
    passwordConfirmation: string;
}

interface SigninCredentials {
    username: string;
    password: string;
}

interface SignupResponse {
    username: string;
}

interface SignedInResponse {
    authenticated: boolean;
    username: string;
}
