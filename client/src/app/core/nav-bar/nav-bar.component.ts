import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasktetService } from 'src/app/basket/basktet.service';
import { IBasket } from 'src/app/shared/Models/Basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  basket$: Observable<IBasket>;
  constructor(private basketServoce: BasktetService) { }

  ngOnInit(): void {
    this.basket$ = this.basketServoce.basket$;
  }

}
