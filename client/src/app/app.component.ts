import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduit } from './Models/Product';
import { IPagination } from './Models/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products: IProduit[];
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void{
    this.http.get('https://localhost:5001/api/products?pageSize=60').subscribe((res:IPagination) =>{
      this.products = res.data;
    },(err:any) =>{
      console.log(err);
    });
  }
}
