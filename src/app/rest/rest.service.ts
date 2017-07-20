import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  Resolve, ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ModelFactory, Model } from 'ngx-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';


const API_URL = 'https://api.fixer.io/latest?base=';

@Injectable()
export class RestService implements Resolve<boolean> {

  private model: Model<Rate[]>;

  rates$: Observable<Rate[]>;

  constructor(
    private http: Http,
    private modelFactory: ModelFactory<Rate[]>
  ) {
    this.model = this.modelFactory.create([]);
    this.rates$ = this.model.data$
      .map(rates => rates.filter(rate => rate.rate < 5));
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.makeRatesRequest('EUR')
        .do(rates => this.model.set(rates))
        .mapTo(true);
  }

  getRates(ccy: string) {
    return this.makeRatesRequest(ccy).subscribe(rates => this.model.set(rates));
  }

  private transformRates(rates: RatesResponse, ccy: string) {
    return Object.keys(rates)
      .map(key => ({ ccypair: `${ccy} / ${key}`, rate: rates[key] }));
  }

  private makeRatesRequest(ccy: string): Observable<Rate[]> {
    return this.http.get(API_URL + ccy)
      .map(res => this.transformRates(res.json().rates, ccy));
  }

}

interface Rate {
  ccypair: string;
  rate: number;
}

interface RatesResponse {
  [index: string]: number;
}
