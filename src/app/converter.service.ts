import { Injectable } from '@angular/core';
import { Currency } from './currency';
import { DataService } from './data.service';

@Injectable()
export class ConverterService {
  private currencyRatesFromRub: Record<string, number> = {};

  private currentRates = new Map<string, number>([
    ['RUB', 0],
    ['USD', 0],
    ['AED', 0],
    ['GEL', 0],
    ['BYN', 0],
    ['KZT', 0],
  ]);

  constructor(private dataService: DataService) {}

  getRates(currencyInfoList: Currency[], base: string) {
    this.dataService.getData().subscribe({
      next: (data: any) => {
        this.currencyRatesFromRub = data['rates'];
        this.currencyRatesFromRub['RUB'] = 1;

        this.recalculateRates(base);
      },
    });
  }

  recalculateRates(base: string) {
    if (base === 'RUB') {
      for (let code of this.currentRates.keys()) {
        const newRate = this.currencyRatesFromRub[code];
        this.currentRates.set(code, newRate);
      }
      return;
    }

    for (let code of this.currentRates.keys()) {
      const newRate =
        this.currencyRatesFromRub[code] / this.currencyRatesFromRub[base];
      this.currentRates.set(code, newRate);
    }
  }

  recalculateAmounts(currencyInfoList: Currency[], amount: number) {
    currencyInfoList.map((curr) => {
      curr.totalAmount = +(amount * this.currentRates.get(curr.code)!).toFixed(
        2
      );
    });
  }
}
