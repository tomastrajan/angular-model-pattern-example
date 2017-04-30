import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ampe-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
  }

}
