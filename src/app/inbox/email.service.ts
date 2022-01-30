import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly apiEndPoint = 'https://api.angular-email.com'

  constructor(
      private http: HttpClient,
  ) {
  }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.apiEndPoint}/emails`);
  }
}
export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}