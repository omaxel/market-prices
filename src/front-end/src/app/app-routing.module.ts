import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonitorPricesComponent} from "./pages/monitor-prices/monitor-prices.component";
import {SetPricesComponent} from "./pages/set-prices/set-prices.component";

const routes: Routes = [
    {path: 'monitor-prices', component: MonitorPricesComponent},
    {path: 'set-prices', component: SetPricesComponent},
    {path: '**', redirectTo: 'monitor-prices'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}