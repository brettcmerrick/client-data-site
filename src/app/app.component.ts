import { Component } from '@angular/core';

@Component({
  selector: 'cm-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
  <a class='navbar-brand'>{{title}}</a>
  <ul class='navbar-nav'>
    <li class='nav-item'><a class='nav-link' routerLinkActive='active'
          [routerLink]="['/clientList']">Client List</a>
    </li>
  </ul>
</nav>
<div class='container'>
  <router-outlet></router-outlet>
</div>
      
            `
})
export class AppComponent {
  title: string = 'Client Manager';
}
