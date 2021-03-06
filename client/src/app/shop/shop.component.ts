import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/Models/Brand';
import { IProduit } from '../shared/Models/Product';
import { IProductType } from '../shared/Models/ProductType';
import { ShopParams } from '../shared/Models/ShopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static:false}) searchTerm : ElementRef;
  products: IProduit[];
  brands: IBrand[];
  productType: IProductType[];
  shopParams = new ShopParams();
  totalCount :number;
  sortOption = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price : Low to High', value: 'priceAsc'},
    {name: 'Price : High to Low', value: 'priceDesc'},
  ];

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

    getProducts() {
      this.shopService.getProducts(this.shopParams).subscribe( (res)=>{
        this.products = res.data;
        this.shopParams.pageNumber = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
  
      })
    }

    getBrands() {
      this.shopService.getBrands().subscribe( (res) =>{
        this.brands = [{id:0,name:'All'}, ...res];
      }, err=>{
        console.log(err);
      })
    }

    getTypes() {
      this.shopService.getTypes().subscribe(res =>{
        this.productType = [{id:0,name:'All'}, ...res];
      }, err=>{
        console.log(err);
      })
    }

    onBrandSelected(brandId: number){
      this.shopParams.brandId = brandId;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }

    onTypeSelected(typeId: number){
      this.shopParams.typeId = typeId;
      this.shopParams.pageNumber = 1;
      this.getProducts(); 

    }

    onSortSelected(sort:string){
      this.shopParams.sort = sort;
      this.getProducts();
    }

    onPageChanged(event:any){
      if(this.shopParams.pageNumber !== event){
        this.shopParams.pageNumber = event;
        this.getProducts();
      }
    }

    onSearch(){
      this.shopParams.search = this.searchTerm.nativeElement.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }

    onReset() {
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.getProducts();
    }
}
