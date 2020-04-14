import { Component, OnInit } from '@angular/core';
import { stat } from 'fs';
import { User } from 'app/services/user.model';
import { Search_service } from 'app/services/search.service';
export interface user {

  name: string;
  email:string;
  status:boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit {
  users: User[] = [];
  constructor(public search_service: Search_service) {}

  ngOnInit() {
    
  }

  sendEmail() {

  }

  chat(user: User) {

  }

}
