import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiEndPoint = 'https://api.angular-email.com/auth'

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.apiEndPoint}/username`, {
      username
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.apiEndPoint}/signup`, credentials)
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

interface SignupResponse {
  username: string;
}
