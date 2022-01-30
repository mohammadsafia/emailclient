import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Email} from "@inbox/email";

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

  getEmail(emailId: string) {
    return this.http.get<Email>(`${this.apiEndPoint}/emails/${emailId}`)
  }
}

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}
