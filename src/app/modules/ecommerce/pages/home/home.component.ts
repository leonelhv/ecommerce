import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: Product[] = [];

  constructor(private ecommerceService: EcommerceService) {
    this.ecommerceService.getProducts().subscribe((products) => {
      this.products = products.slice(0, 4);
    });
  }
}
