import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ampe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  year: number = (new Date).getFullYear();

  ngOnInit(): void {
    $('.button-collapse').sideNav({ closeOnClick: true });
  }

}
