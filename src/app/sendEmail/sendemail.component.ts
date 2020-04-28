import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { User } from 'app/services/user.model';
import { Router} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Search_service } from 'app/services/search.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component ({
    selector: 'app-sendemail',
    templateUrl: './sendemail.component.html',
    styleUrls: ['./sendemail.component.css']
})
export class SendEmailComponent implements OnInit, OnDestroy{
    toUser: User;
    currentUser: User;
    toUserEmailId: string;
    userIsAuthenticated = false;
    isLoading = true;
    emailForm: FormGroup;
    private authListenerSubs: Subscription;
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private searchService: Search_service, private _snackBar: MatSnackBar){}

    ngOnInit() {
        this.toUserEmailId = this.activatedRoute.snapshot.paramMap.get('id');
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
        this.searchService.getUserObject(this.toUserEmailId).subscribe(data => {
            this.toUser = data;
            this.isLoading = false;
            
        })

        this.emailForm = new FormGroup({
            'emailText': new FormControl(null, {
              validators: [Validators.minLength(1)]
            })
        });
        
        
    }

    sendEmail() {
        if(this.emailForm.invalid){
            alert("The email body cannot be empty!");
            return;
        } else {
            this.searchService.sendPersonalMail(this.emailForm.value.emailText,this.toUserEmailId,this.authService.getAuthData().userEmail).subscribe(data => {
                if(data.message == 'Sent mail'){
                  this._snackBar.open('Mail sent!', 'Okay', {
                    duration: 3000
                  });
                } else {
                  this._snackBar.open('Error sending mail, try again!', 'Okay', {
                    duration: 3000
                  });
                }
              })
        }
    }

    ngOnDestroy() {}
}