import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../../../backend/models/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], searchterm: string): Product[] {
      if(!products || !searchterm){
        return products;
      }

      return products.filter(product =>
        product.name.toLowerCase().indexOf(searchterm.toLowerCase()) !== -1);
  }
}
