import { Component, computed, inject, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { Product } from '../../models/product';

@Component({
  imports: [CurrencyPipe, MatIcon, MatButton, MatIconButton],
  selector: 'app-product-card',
  styles: ``,
  template: `
    <div
      class="relative bg-gray-900 cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <img [src]="product().imageUrl" class="w-full aspect-[2/3] object-cover rounded-xl" />

      <ng-content />

      <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-white mb-2 leading-tight">
          {{ product().name }}
        </h3>

        <p class="text-sm text-white mb-4 flex-1 leading-relaxed">
          {{ product().description }}
        </p>

        <div class="text-sm font-medium mb-4 text-white">
          {{ product().inStock ? 'Em Estoque' : 'Fora de Estoque' }}
        </div>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-1xl font-bold text-white">
            {{ product().price | currency: 'BRL' : 'symbol' : '1.2-2' }}
          </span>

          <button
            matButton="filled"
            class="flex items-center gap-1 whitespace-nowrap text-sm !text-sm"
            (click)="addToCartClicked.emit(product())"
          >
            <mat-icon>shopping_cart</mat-icon>

            <span class="whitespace-nowrap"> Adicionar ao Carrinho </span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCard {
  product = input.required<Product>();

  addToCartClicked = output<Product>();

}
