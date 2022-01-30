import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    signedin$ = new BehaviorSubject<any>(null);
    username = '';

    private readonly apiEndPoint = 'https://api.angular-email.com/auth'

    constructor(private http: HttpClient) {
    }

    usernameAvailable(username: string) {
        return this.http.post<UsernameAvailableResponse>(`${this.apiEndPoint}/username`, {
            username
        })
    }

    signup(credentials: SignupCredentials) {
        return this.http.post<SignupResponse>(`${this.apiEndPoint}/signup`, credentials).pipe(tap(({username}) => {
            this.signedin$.next(true);
            this.username = username;
        }))
    }

    checkAuth() {
        return this.http.get<SignedInResponse>(`${this.apiEndPoint}/signedin`).pipe(
            tap(({authenticated, username}) => {
                this.signedin$.next(authenticated);
                this.username = username;
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
        return this.http.post<SignedInResponse>(`${this.apiEndPoint}/signin`, credentials).pipe(
            tap(({username}) => {
                this.signedin$.next(true);
                this.username = username;
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
