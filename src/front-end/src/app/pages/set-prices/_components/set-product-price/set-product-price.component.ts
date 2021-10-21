import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Product} from "../../../../models/Product";

@Component({
    selector: 'app-set-product-price',
    templateUrl: 'set-product-price.component.html',
    styleUrls: ['set-product-price.component.scss']
})
export class SetProductPriceComponent implements OnInit {
    @Input() id!: string;
    @Input() name!: string;
    @Input() price!: number;

    @Output() savePrice = new EventEmitter<Product>();

    priceFormControl = new FormControl(null, [Validators.required, Validators.min(0.01)])

    ngOnInit() {
        this.priceFormControl.setValue(this.price);
    }

    updatePrice(event: Event) {
        event.preventDefault();

        if (this.priceFormControl.invalid) {
            alert(
                `Price for product '${this.name}' is not valid. ` +
                (this.priceFormControl.errors?.required ? 'The field is required.' : '') +
                (this.priceFormControl.errors?.min ? 'The minimum value is 0.01' : '')
            );
            return;
        }

        this.savePrice.emit({
            id: this.id,
            name: this.name,
            price: +this.priceFormControl.value
        })
    }
}
