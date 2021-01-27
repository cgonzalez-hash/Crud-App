import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    ShoppingCartComponent,
    LoginPageComponent,
    AdminPanelComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent, pathMatch: 'full' },
      { path: 'orders', component: OrdersComponent },
      { path: 'user', component: UsersComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'admin', component: AdminPanelComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
