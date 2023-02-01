import { Component } from '@angular/core';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';
import { Product } from '../../../interfaces/product.interface';
import { listProduct } from '../../../mocks/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = listProduct;
  constructor(private ecommerceService: EcommerceService) {
    /*  this.ecommerceService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    }); */
  }
}
