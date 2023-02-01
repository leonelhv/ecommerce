import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products!: Product[];
  constructor(
    private ecommerceService: EcommerceService,
    private toastr: ToastrService
  ) {
    this.ecommerceService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onDeleteProduct(product: Product) {
    this.ecommerceService.deleteProduct(product).then((res) => {
      this.toastr.success('Producto eliminado con éxito', 'Producto Eliminado');
    });
  }
}
