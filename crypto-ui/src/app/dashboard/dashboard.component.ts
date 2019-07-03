import { Component, OnInit } from '@angular/core';

import { Cryptocurrency } from '../cryptocurrency';
import { CRYPTOCURRENCIES } from '../crypto-examples';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cryptocurrencies: Cryptocurrency[] = CRYPTOCURRENCIES;

  constructor() { }

  ngOnInit() {
  }

}
