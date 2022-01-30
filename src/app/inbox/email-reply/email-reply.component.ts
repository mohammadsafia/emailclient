import {Component, Input, OnChanges} from '@angular/core';
import {Email} from "@inbox/email";
import {EmailService} from "@inbox/email.service";

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
  showModal = false;
  @Input() email!: Email;

  constructor(private emailService: EmailService) {
  }

  ngOnChanges(): void {
    const text = this.email.text
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      text: `\n\n\n-------${this.email.from} wrote:\n>${text}`
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }
}
