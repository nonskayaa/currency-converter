import { Component, ElementRef, ViewChild } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Currency, CurrencyRate } from './currency';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { DataService } from './data.service';

import { HttpClientModule } from '@angular/common/http';

// import usa_flag from '../assets/images/flags/usa.png';
// import arab_emirates_flag from '../assets/images/flags/arab-emirates.png';
// import georgia_flag from '../assets/images/flags/georgia.png';
// import belarus_flag from '../assets/images/flags/belarus.png';
// import kazahstan_flag from '../assets/images/flags/kazahstan.png';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Currency Converter';

  amount: number = 1000;

  currencyRates: Record<string, number> = {};

  currencyToList: Currency[] = [
    // {code: "RUB", symbol:"₽",flag:'../assets/images/flags/russia.png'}
    { code: 'USD', symbol: '$', flag: '../assets/images/flags/usa.png' },
    {
      code: 'AED',
      symbol: 'Dhs',
      flag: '../assets/images/flags/arab-emirates.png',
    },
    { code: 'GEL', symbol: '₾', flag: '../assets/images/flags/georgia.png' },
    { code: 'BYN', symbol: 'Br', flag: '../assets/images/flags/belarus.png' },
    { code: 'KZT', symbol: '₸', flag: '../assets/images/flags/kazahstan.png' },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (data: any) => {
        this.currencyRates = data['rates'];
        console.log(this.currencyRates);
      },
    });
  }

  changeAmount(input: string) {
    if (Number.isFinite(Number(input)) && Number(input) >= 0) {
      this.amount = Number(input);
    } else {
      alert('Некорректный ввод:(');
      this.amount = 0;
    }
  }
}
