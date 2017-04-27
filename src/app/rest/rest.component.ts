import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';

@Component({
  selector: 'ampe-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent implements OnInit {

  constructor(public restService: RestService) { }

  ngOnInit() {
  }

  onCcyChange(ccy: string) {
    this.restService.getRates(ccy);
  }

}
