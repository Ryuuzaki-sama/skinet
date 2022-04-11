import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasktetService } from 'src/app/basket/basktet.service';
import { IBasketTotals } from '../../Models/Basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$: Observable<IBasketTotals>;

  constructor(private basketService:BasktetService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
  }

}
