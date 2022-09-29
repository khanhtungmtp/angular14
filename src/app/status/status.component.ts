import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  template: `
    <h4>
      Oops, 404 Not Found
    </h4>
  `,
  styles: [
    "h4{color:red;font-size:50px}"
  ]
})
export class StatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
