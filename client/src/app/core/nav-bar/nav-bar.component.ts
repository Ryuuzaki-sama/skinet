import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasktetService } from 'src/app/basket/basktet.service';
import { IBasket } from 'src/app/shared/Models/Basket';
import { IUser } from 'src/app/shared/Models/User';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  basket$: Observable<IBasket>;
  currentUser$ : Observable<IUser>;

  constructor(private basketServoce: BasktetService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.basket$ = this.basketServoce.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout()
  {
    this.accountService.Logout();
  }

}
