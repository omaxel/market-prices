import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MonitorPricesComponent} from './pages/monitor-prices/monitor-prices.component';
import {SetPricesComponent} from './pages/set-prices/set-prices.component';
import { ProductComponent } from './pages/monitor-prices/_components/product/product.component';
import { SetProductPriceComponent } from './pages/set-prices/_components/set-product-price/set-product-price.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    MonitorPricesComponent,
    SetPricesComponent,
    ProductComponent,
    SetProductPriceComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
