import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {PageEvent} from '@angular/material/paginator';

export interface product {
  price: number;
  Name: string;
}

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
// pagedItem here is used just to check pager will habe all pageditems
  pagedItems: Array<product> = [
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
    },
    {
      price: 400,
      Name: 'Name 6'
    }
  ];

    // array of all items to be paged 
    private allItems: any[];
// NOTE: here we have to fetch all the items from the server !! (not server side pagination)

    // pager object
    pager: any = {totalItems: 17,
      currentPage: 2,
      pageSize: 5,
      totalPages: 4,
      startPage: 3,
      endPage: 7,
      startIndex: 6,
      endIndex: 7,
      pages: [3,4,5,6,7]
    }
    // paged items
    //pagedItems: any[];
/*
    ngOnInit() {
        // get dummy data
        this.http.get('./dummy-data.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;

                // initialize to page 1
                this.setPage(1);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  */
}