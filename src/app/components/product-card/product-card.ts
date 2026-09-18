import { Component, computed, inject, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { Product } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  imports: [CurrencyPipe, MatIcon, MatButton, MatIconButton],
  selector: 'app-product-card',
  styles: ``,
  template: `
    <div
      class="relative bg-gray-900 cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <img [src]="product().imageUrl" class="w-full aspect-[2/3] object-cover rounded-xl" />

      <button
        class="!absolute z-10 top-3 right-3 w-10 h-10 rounded-full !bg-gray-900 border-0 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
        [class]="isInWishlist() ? '!text-red-500' : '!text-gray-400'"
        matIconButton
        (click)="toggleWishlist(product())"
      >
        <mat-icon [class.!text-white]="!isInWishlist()" [class.!text-purple-500]="isInWishlist()">
          {{ isInWishlist() ? 'favorite' : 'favorite_bolder' }}
        </mat-icon>
      </button>

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

  store = inject(EcommerceStore);

  isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addtoWishlist(product);
    }
  }
}
