import { Component, inject, input, output } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { MatButton } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';

import { Product } from '../../models/product';

import { CartStore } from '../../cart-store';

import { RouterLink } from '@angular/router';

@Component({
  imports: [CurrencyPipe, MatIcon, MatButton, RouterLink],
  selector: 'app-product-card',
  styles: ``,
  template: `
    <div class="relative bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all durantion-200 ease-out hover:-translate-y-1 hover:shadow-xl">
      <!-- IMAGEM -->
      <div class="grid">
        <img
          [src]="product().imageUrl"
          class="col-start-1 row-start-1 w-full aspect-[2/3] object-cover rounded-xl cursor-pointer"
          [routerLink]="['/product', product().id]"
          [style.view-transition-name]="'product-image-' + product().id"
        />

        <!-- BOTÕES EXTRAS (Wishlist / Excluir) -->
        <div class="col-start-1 row-start-1 justify-self-end self-start m-3 z-10">
          <ng-content />
        </div>
      </div>

      <!-- INFORMAÇÕES -->
      <div class="p-5 flex flex-col flex-1">
        <!-- NOME -->
        <h3
          class="text-lg font-semibold text-white mb-2 leading-tight cursor-pointer"
          [routerLink]="['/product', product().id]"
        >
          {{ product().name }}
        </h3>

        <!-- DESCRIÇÃO -->
        <p
          class="text-sm text-white mb-4 flex-1 leading-relaxed cursor-pointer"
          [routerLink]="['/product', product().id]"
        >
          {{ product().description }}
        </p>

        <!-- ESTOQUE -->
        <div
          class="text-sm font-medium mb-4 text-white cursor-pointer"
          [routerLink]="['/product', product().id]"
        >
          {{ product().inStock ? 'Em Estoque' : 'Fora de Estoque' }}
        </div>

        <!-- PREÇO + CARRINHO -->
        <div class="flex items-center justify-between mt-auto">
          <!-- PREÇO -->
          <span
            class="text-1xl font-bold text-white cursor-pointer"
            [routerLink]="['/product', product().id]"
          >
            {{ product().price | currency: 'BRL' : 'symbol' : '1.2-2' }}
          </span>

          <!-- ADICIONAR AO CARRINHO -->
          <button
            matButton="filled"
            type="button"
            class="flex items-center gap-1 whitespace-nowrap text-sm !text-sm"
            [class.!bg-gray-600]="!product().inStock"
            [class.!text-gray-300]="!product().inStock"
            (click)="addToCart()"
            [disabled]="!product().inStock"
          >
            <mat-icon>shopping_cart</mat-icon>

            <span class="whitespace-nowrap">
              {{ product().inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCard {
  product = input.required<Product>();

  cartStore = inject(CartStore);

  addToCartClicked = output<Product>();

  addToCart() {
    this.cartStore.addToCart(this.product());
    this.addToCartClicked.emit(this.product());
  }
}
