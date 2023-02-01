import { Component, Input } from '@angular/core';
import { CartUser } from 'src/app/interfaces/cartUser.interface';

@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.css'],
})
export class CardCartComponent {
  @Input() cartItem!: CartUser;
}
