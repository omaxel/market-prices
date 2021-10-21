import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {SignalRService} from "../../services/signal-r.service";

@Component({
    selector: 'app-monitor-prices',
    templateUrl: 'monitor-prices.component.html',
    styleUrls: ['monitor-prices.component.scss']
})
export class MonitorPricesComponent implements OnInit {
    products: Product[] = [];

    constructor(private httpClient: HttpClient, private signalRService: SignalRService) {
    }

    ngOnInit() {
        this.httpClient.get<Product[]>(environment.apiUrl + '/products')
            .pipe(
                tap(data => this.products = data),
                tap(() => this.startConnection())
            )
            .subscribe();
    }

    async startConnection() {
        const connection = await this.signalRService.startConnection();

        connection.on('product-update', product => {
            const productToUpdate = this.products.find(x => x.id === product.id);

            if(!productToUpdate){
                console.warn(`No existing product found with Id '${product.id}'.`);
                return;
            }

            productToUpdate.name = product.name;
            productToUpdate.price = product.price;
        });
    }
}
