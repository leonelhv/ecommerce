import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EcommerceService } from 'src/app/shared/services/ecommerce.service';
import { regexImageURL } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent {
  constructor(
    private fb: FormBuilder,
    private ecommerceService: EcommerceService,
    private toastr: ToastrService
  ) {
    this.initFormProduct();
  }

  formProduct!: FormGroup;

  onSaveProduct() {
    if (this.formProduct.valid) {
      this.ecommerceService.addproduct(this.formProduct.value).then((res) => {
        this.initFormProduct();
        this.toastr.success(
          'Puede seguir agregando más productos',
          'Producto Agregado'
        );
      });
    }
  }

  private initFormProduct() {
    this.formProduct = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      category: ['other', Validators.required],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(500),
        ],
      ],
      price: ['', [Validators.required, Validators.min(3)]],
      offer: [0, [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required, Validators.pattern(regexImageURL)]],
    });
  }
  get form() {
    return this.formProduct.controls;
  }

  campoNoValido(campo: string) {
    return (
      this.formProduct.get(campo)?.invalid &&
      this.formProduct.get(campo)?.touched
    );
  }
}
