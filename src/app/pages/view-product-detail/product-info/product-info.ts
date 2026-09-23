import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';
import { EcommerceStore } from '../../../ecommerce-store';
import { CartStore } from '../../../cart-store';

@Component({
  imports: [
    TitleCasePipe,
    CurrencyPipe,
    StockStatus,
    MatIcon,
    MatIconButton,
    QtySelector,
    ToggleWishlistButton,
    MatButton,
  ],
  selector: 'app-product-info',
  styles: ``,
  template: `
    <div class="text-xs rounded-xl bg-purple-600 text-white px-3 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>

    <h1 class="text-2xl font-extrabold mb-3">
      {{ product().name }}
    </h1>

    <p class="text-3xl font-extrabold mb-4">
      {{ product().price | currency: 'BRL' : 'symbol' : '1.2-2' }}
    </p>

    <app-stock-status class="mb-4" [inStock]="product().inStock" />

    <p class="font-semibold mb-2">Descrição</p>

    <p class="text-white border-b border-gray-200 pb-4">
      {{ product().description }}
    </p>

    <div class="flex items-center gap-2 mb-3 pt-4">
      <span class="font-semibold">Quantidade:</span>

      <app-qty-selector [quantity]="quantity()" (qtyUpdated)="quantity.set($event)" />
    </div>

    <div class="flex gap-10 mb border-b border-gray-200 pb-4">
      <button
        type="button"
        class="w-2/3 h-10 flex items-center justify-center gap-2 rounded-md text-white transition-colors duration-200"
        [class.bg-gray-700]="product().inStock"
        [class.hover:bg-purple-600]="product().inStock"
        [class.!bg-gray-600]="!product().inStock"
        [class.!text-gray-300]="!product().inStock"
        (click)="cartStore.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon>shopping_cart</mat-icon>

        {{ product().inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque' }}
      </button>

      <app-toggle-wishlist-button [product]="product()" />
    </div>

    <div class="pt-6 flex flex-col gap-3 text-white text-xs">
      <div class="flex items-center gap-3">
        <mat-icon class="small !text-[#8b5cf6]">bolt</mat-icon>
        <span>Entrega Imediata após a Compra, Exceto em Pré-Vendas</span>
      </div>

      <div class="flex items-center gap-3">
        <mat-icon class="small !text-[#8b5cf6]">vpn_key</mat-icon>
        <span>Chave Digital</span>
      </div>

      <div class="flex items-center gap-3">
        <mat-icon class="small !text-[#8b5cf6]">verified</mat-icon>
        <span>Compra Segura e Protegida</span>
      </div>

      <div class="flex items-center gap-3">
        <mat-icon class="small !text-[#8b5cf6]">devices</mat-icon>
        <span>Ativação na Plataforma Indicada</span>
      </div>
    </div>
  `,
})
export class ProductInfo {
  product = input.required<Product>();
  quantity = signal(1);

  store = inject(EcommerceStore);
  cartStore = inject(CartStore);
}
