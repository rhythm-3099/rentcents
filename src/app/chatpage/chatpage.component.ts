import { Component, OnInit } from '@angular/core';
import { stat } from 'fs';
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

   username: String ='Chintu'; //user using the app
   email: String;
   chatroom;
   message: String;
   roomId : String;   
   isTyping = true;
   currentUsername : string =''; // current user with whom is chating 
   nm : String;
   currentUser : user;
   allUsers = [
     {
       name:'Akash',
       email:'tmp',
       status: true
     },
     {
      name:'Rhythm',
      email:'tmp',
      status:true
    },
    {
      name:'Jay',
      email:'tmp',
      status:false
    },
    {
      name:'Yogesh',
      email:'tmp',
      status:false
    },
    {
      name:'Rushabh',
      email:'tmp',
      status:true
    }
    
   ];
   messageArray: Array<{user: String, message: String}> 
   = [    ];
  constructor() { }

  ngOnInit(): void {
  }

  
  sendMessage() {
    // this.webSocketService.sendMessage({room: this.chatroom, user: this.currentUsername, message: this.message});
    // this.message = '';
  }
  typing() {
    // this.webSocketService.typing({room: this.chatroom, user: this.currentUsername});
  }
  getchat(uname:user) {
    this.currentUser=uname;
    this.currentUsername=(this.currentUser).name;
    
// get messages from db of this user temporaryly using
this.messageArray=[{
  user:'chintu',
  message:'hi'
 },
 {
   user: 'akash',
   message:'bol'
 },
 {
   user: 'chintu',
   message:'su kare?'
 },
 {
   user: 'chintu',
   message:'mkamskmsa'
 },
 
 {
   user: 'chintu',
   message:'mkamskmsa'
 },
 
 {
   user: 'akash',
   message:'mkamskmsa'
 },
 {
  user:'chintu',
  message:'hi'
 },
 {
   user: 'akash',
   message:'bol'
 },
 {
   user: 'chintu',
   message:'su kare?'
 },
 {
   user: 'chintu',
   message:'mkamskmsa'
 },
 
 {
   user: 'chintu',
   message:'mkamskmsa'
 },
 
 {
   user: 'akash',
   message:'mkamskmsa'
 }]

  }
}
