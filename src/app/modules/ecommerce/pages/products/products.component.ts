import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private ecommerceService: EcommerceService) {
    this.ecommerceService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
