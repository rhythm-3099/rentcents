import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PageEvent} from '@angular/material/paginator';

export interface product {

    Price: number;
    Age: number;
  }
  
import {User_item_service} from "../services/user_item.service";

@Component({
    selector: 'app-productcategorize',
    templateUrl: './productcategorize.component.html',
    styleUrls: ['./productcategorize.component.css']
})

export class ProductCategorizeComponent{
    // pagedItem here is used just to check pager will habe all pageditems
  pagedItems: Array<product> = [
    { 
      Price: 200,
      Age: 23
    },
    {
        Price: 100,
        Age: 2
    },
    {
        Price: 200,
        Age: 22
    },
    {
        Price: 100,
        Age: 2
    },
    {
        Price: 200,
        Age: 3
    },
    {
        Price: 100,
        Age: 22
    },
    {
        Price: 200,
        Age: 2
    },
    {
        Price: 100,
        Age: 2
    },
    {
        Price: 200,
        Age: 2
    },
    {
        Price: 100,
        Age: 2
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
