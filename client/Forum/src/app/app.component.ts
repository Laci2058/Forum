import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports:[
    FormsModule,
    CommonModule,
  ],
  template: `
    <h2>Messages</h2>
    <ul>
      <li *ngFor="let msg of messages">{{ msg.text }}</li>
    </ul>
    <input [(ngModel)]="newMessage" placeholder="Type a message" />
    <button (click)="addMessage()">Send</button>
  `,
})
export class AppComponent implements OnInit {
  messages: any[] = [];
  newMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.http.get<any[]>('/api/messages').subscribe(data => {
      this.messages = data;
    });
  }

  addMessage() {
    this.http.post('/api/messages', { text: this.newMessage }).subscribe(() => {
      this.newMessage = '';
      this.loadMessages();
    });
  }
}
