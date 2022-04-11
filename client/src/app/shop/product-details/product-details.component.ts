import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduit } from 'src/app/shared/Models/Product';
import { ShopService } from '../shop.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import { BasktetService } from 'src/app/basket/basktet.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:IProduit;
  quantity = 1;
  constructor(
    private shopService: ShopService,
    private activateRoute:ActivatedRoute,
    private bcService:BreadcrumbService,
    private basketService : BasktetService) 
    {
      this.bcService.set('@productDetails',' ');
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  loadProduct(){
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(res =>{
      this.product = res;
      this.bcService.set('@productDetails',this.product.name)
    }, err =>{
      console.log(err);
    })
  }

}
