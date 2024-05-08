// export class DataService {
//   private mockCurrencyRates = new Map([
//     ['USD', 0.1],
//     ['AED', 0.2],
//     ['GEL', 0.5],
//   ]);

//   getData() {
//     return this.mockCurrencyRates;
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://www.cbr-xml-daily.ru/latest.js');
  }
}
