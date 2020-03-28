import  {Pipe, PipeTransform} from '@angular/core';
import { Product } from '../../../backend/models/product';
@Pipe({
    name:'productPriceFilter'
})

export class FilterPricePipe implements PipeTransform{
    transform(items:Product[] , searchtext: String):any[]{
        if(!items){
            // console.log("No items");
            return [];
        }
        if(!searchtext){
            // console.log("st");
            return items;}
        return items.filter( it=>{
            let ans = false;
            let price = Number(it.price);
            let criterion = Number(searchtext);
            //console.log(price,criterion);
            if(price <= criterion){
                ans = true;
            }
            return ans;
        });
    }
}
