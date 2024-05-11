import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Currency } from './currency';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { ConverterService } from './converter.service';
import { NgClass } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

const base: string = 'RUB';
const amount: number = 1000;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgClass, FormsModule, HttpClientModule],
  providers: [DataService, ConverterService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'Currency Converter';

  amount: number = 1000;
  base: string = 'RUB';

  currencyInfoList: Currency[] = [
    {
      code: 'RUB',
      symbol: '₽',
      flag: '../assets/images/flags/russia.png',
      totalAmount: 0,
    },
    {
      code: 'USD',
      symbol: '$',
      flag: '../assets/images/flags/usa.png',
      totalAmount: 0,
    },
    {
      code: 'AED',
      symbol: 'Dhs',
      flag: '../assets/images/flags/arab-emirates.png',
      totalAmount: 0,
    },
    {
      code: 'GEL',
      symbol: '₾',
      flag: '../assets/images/flags/georgia.png',
      totalAmount: 0,
    },
    {
      code: 'BYN',
      symbol: 'Br',
      flag: '../assets/images/flags/belarus.png',
      totalAmount: 0,
    },
    {
      code: 'KZT',
      symbol: '₸',
      flag: '../assets/images/flags/kazahstan.png',
      totalAmount: 0,
    },
  ];

  constructor(private converterService: ConverterService) {}

  ngOnInit() {
    this.converterService.getRates(this.currencyInfoList, this.base);
  }

  changeAmount(input: string, base: string) {
    if (!Number.isFinite(Number(input)) || Number(input) < 0) {
      alert('Некорректный ввод:(');

      this.amount = 0;

      this.converterService.recalculateAmounts(
        this.currencyInfoList,
        this.amount
      );

      return;
    }

    this.base = base;
    this.amount = Number(input);

    this.converterService.recalculateRates(this.base);

    this.converterService.recalculateAmounts(
      this.currencyInfoList,
      this.amount
    );
  }
}
