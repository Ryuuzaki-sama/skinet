import { Component, Input, OnInit } from '@angular/core';
import { BasktetService } from 'src/app/basket/basktet.service';
import { IProduit } from 'src/app/shared/Models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() product: IProduit;

  constructor(private basketService:BasktetService) { }

  ngOnInit(): void {
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }
}
