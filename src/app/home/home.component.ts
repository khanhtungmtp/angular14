import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  headerName = "Angular 14 tutorial"
  colorName = "green"
  monney = 1000
  isDisable = false;
  ngOnInit(): void {
  }

  functionClick(val: string) {
    alert(val)
  }

}
