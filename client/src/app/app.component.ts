import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasktetService } from './basket/basktet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(private basketService:BasktetService, private accountService: AccountService) {}
  
  ngOnInit(): void{
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.LoadCurrentUser(token).subscribe(()=>{
    }, err =>{
      console.log(err);
    })
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId) {
      this.basketService.getBasket(basketId).subscribe(()=>{
      }, err =>{
        console.log(err);
      })
    }
  }
}
