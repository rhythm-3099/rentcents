import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  answer : any;
  nm : any ;
  payment_obj : any;
  sanddox_url = "https://www.sandbox.paypal.com/myaccount/home";
  constructor() { }

  ngOnInit(): void {
  }

}
