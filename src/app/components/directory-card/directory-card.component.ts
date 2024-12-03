import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-directory-card',
  standalone: true,
  imports: [],
  templateUrl: './directory-card.component.html',
  styleUrls: ['./directory-card.component.scss']
})
export class DirectoryCardComponent {
  @Input() user_name: string = '';
  @Input() description: string = '';
  @Input() phone_number: string = '';
  @Input() email: string = '';
  @Output() messageClicked = new EventEmitter<any>();

  onSendMessage() {
    const user = {
      name: this.user_name,
      email: this.email,
      phone: this.phone_number
    };
  
    this.openTidioChat(user);
  
    this.messageClicked.emit(user);
  }
  

  openTidioChat(user: any) {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
      window.tidioChatApi.setVisitorName(user.name);
      window.tidioChatApi.setVisitorEmail(user.email);
    }
  }
}
