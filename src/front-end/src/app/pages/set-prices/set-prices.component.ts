import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-set-prices',
    templateUrl: 'set-prices.component.html',
    styleUrls: ['set-prices.component.scss']
})
export class SetPricesComponent implements OnInit {
    products: Product[] = [];

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.httpClient.get<Product[]>(environment.apiUrl + '/products')
            .pipe(tap(data => this.products = data))
            .subscribe();
    }

    updateProductPrice(product: Product) {
        console.log(`Saving changes to product ${product.name}`);

        this.httpClient.put(environment.apiUrl + '/products/' + product.id, {
            name: product.name,
            price: +product.price
        }).subscribe(() => {
            console.log(`Changes to product '${product.name}' saved.`);
        }, () => {
            console.log(`Unexpected error while saving changes to product '${product.name}'.`);
        });
    }
}
