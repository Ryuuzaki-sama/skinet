import { Component, OnInit } from '@angular/core';
import { BasktetService } from './basket/basktet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(private basketService:BasktetService) {}
  
  ngOnInit(): void{
    const basketId = localStorage.getItem('basket_id');
    if(basketId) {
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log('Initialised basket');
      }, err =>{
        console.log(err);
      })
    }
  }
}
