import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.scss'],
    animations: [
        trigger('magnifyPrice', [
            state('normal', style({
                transform: 'scale(1)',
                color: 'inherit'
            })),
            state('magnified', style({
                transform: 'scale(1.3)',
                color: '{{priceColor}}'
            }), {params: {priceColor: 'inherit'}}),
            transition('normal <=> magnified', [
                animate('0.2s')
            ]),
        ]),
    ]
})
export class ProductComponent {
    magnifyPrice = false;
    currentPrice = 0;

    private previousPrice: number | null = null;
    priceColor = 'inherit';

    @ViewChild("price") priceElem!: ElementRef;

    @Input() name!: string;

    @Input() set price(value: number) {
        this.currentPrice = value;

        // Animate the price if the previous price was different
        if (this.previousPrice !== null && this.previousPrice !== value) {
            this.magnifyPrice = true;
            this.priceColor = this.getPriceColor(this.previousPrice, this.currentPrice);
        }

        this.previousPrice = value;
    }

    private getPriceColor(previousPrice: number | null, currentPrice: number) {
        if (previousPrice == null || previousPrice === currentPrice)
            return 'inherit';

        if (previousPrice > currentPrice)
            return 'green';

        return 'red';
    }

    onAnimationEnd() {
        this.magnifyPrice = false;
    }
}
