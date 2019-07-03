import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css']
})
export class CryptoCardComponent implements OnInit {

  @Input() title: string;
  @Input() sentimentScore: number;
  @Input() price: number;
  @Input() changeHour: number;

  constructor() { }

  ngOnInit() {
  }

}
