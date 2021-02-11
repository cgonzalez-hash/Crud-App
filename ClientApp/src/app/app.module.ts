import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {MatButtonModule} from '@angular/material/button';
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsformComponent } from './productsform/productsform.component';
import { OrderformComponent } from './orderform/orderform.component';
import { LoadingInterceptorService } from './loading-interceptor.service';
import { LoadingService } from './loading.service';
import { FilterPipe } from './filter.pipe';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { KlaMatTableModule } from "@kla-shared/ngx-kla-material-core/table";
import { NgxKlaMaterialCoreModule } from '@kla-shared/ngx-kla-material-core';
import { CartConfirmComponent } from './cart-confirm/cart-confirm.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';











@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AdminPanelComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductsformComponent,
    OrderformComponent,
    FilterPipe,
    CartConfirmComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    MaterialFileInputModule,
    MatTabsModule,
    KlaMatTableModule,
    NgxKlaMaterialCoreModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent, pathMatch: 'full' },
      { path: 'Admin', component: AdminPanelComponent, canActivate: [AuthorizeGuard] },
      { path: 'Cart', component: ShoppingCartComponent},
    ]),
    
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule

    
    
  ],
  exports: [MatButtonModule],
  entryComponents: [ProductsformComponent, OrderformComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi:true},
    LoadingService,
    FilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
