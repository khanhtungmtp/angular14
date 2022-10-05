import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  /**
   *
   */
  constructor(
    private router: Router
  ) {
  }
  title = 'angular14';
  isMenuVisible = true;
  ngDoCheck(): void {
    const currentRoute = this.router.url;
    currentRoute == '/login' ? this.isMenuVisible = false : this.isMenuVisible = true;
  }
}
