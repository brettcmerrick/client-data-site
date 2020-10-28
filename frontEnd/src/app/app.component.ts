import { Component } from '@angular/core';

@Component({
  selector: 'cm-root',
  template: `


<nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
  <div class="container">
    <a class="navbar-brand" href="#">
          <img [src]="logoIcon"
               [style.width.px]="logoWidth"
               [style.margin.px]="logoMargin">
        </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" routerLinkActive='active'
          [routerLink]="['/clientList']">Client List
                <span class="sr-only">(current)</span>
              </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
          [routerLink]="['/clientEdit/0/edit']">Create New Client
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Page Content -->
<div class="container">
  <h1 class="mt-4">{{title}}</h1>
  <router-outlet></router-outlet>
</div>
<!-- /.container -->
      
            `
})
export class AppComponent {
  title: string = 'Client Manager';
  logoIcon = '../assets/images/logo.png';
  logoWidth = '80';
  logoMargin = '0';

  
}
