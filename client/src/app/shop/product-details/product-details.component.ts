import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduit } from 'src/app/shared/Models/Product';
import { ShopService } from '../shop.service';
import {BreadcrumbService} from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:IProduit;
  constructor(
    private shopService: ShopService,
    private activateRoute:ActivatedRoute,
    private bcService:BreadcrumbService) 
    {
      this.bcService.set('@productDetails',' ');
    }

  ngOnInit(): void {
    this.loadProduct();
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
