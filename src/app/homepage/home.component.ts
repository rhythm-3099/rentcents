import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

export interface product {
  price: number;
  Name: string;
}

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  products: Array<product> = [
    { 
      Name: 'Name 1',
      price: 100
    },
    {
      price: 200,
      Name: 'Name 2'
    },
    {
      price: 300,
      Name: 'Name 3 '
    },
    {
      price: 400,
      Name: 'Name 4'
    },
    {
      price: 300,
      Name: 'Name 5 '
    },
    {
      price: 400,
      Name: 'Name 6'
    }
  ];
}