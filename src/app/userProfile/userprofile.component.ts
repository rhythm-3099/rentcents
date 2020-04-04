import {Component, OnInit, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {Search_service} from "../services/search.service";
import { User } from 'app/services/user.model';
import { AuthService } from 'app/auth/auth.service';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css']
})

export class UserProfileComponent implements OnInit, OnDestroy{
  currentUser: User;
  currentUserEmail: string;
  title: string;
  public isLoading = true;
  constructor(public search_service: Search_service, private authService: AuthService){}

  async ngOnInit(){
    this.currentUserEmail = this.authService.getAuthData().userEmail;
    //console.log(this.currentUserEmail);

    // currethis.search_service.getUserObject(this.currentUserEmail).then(response => {
    //   let currUser: User = response;
    //   this.currentUser = currUser;
    // });


    //})
    this.search_service.getUserObject(this.currentUserEmail).subscribe(data => {
      this.currentUser = data;
      //console.log(this.currentUser);

      if(this.currentUser){
        this.title="Hello "+this.currentUser.userName.toUpperCase();
        this.isLoading = false;
      }
    }, error => {
      console.log(error);
    });

  }

  ngOnDestroy(){

  }

}
