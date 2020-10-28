import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ClientModule } from './Clients/client.module';
import { RouterModule } from '@angular/router';
import { ClientListComponent } from './Clients/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'clientList', component: ClientListComponent},
      { path: '', redirectTo: '/clientList', pathMatch: 'full'}
    ]),
    ClientModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
