import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ampe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Model Pattern';

  ngOnInit(): void {
    $('.button-collapse').sideNav();
  }

}
