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

  styles: `
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    .product-title {
      max-width: 100%;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    .product-description {
      max-width: 100%;
      min-width: 0;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    .quantity-container {
      max-width: 100%;
      min-width: 0;
      flex-wrap: wrap;
    }

    .purchase-actions {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .purchase-button {
      width: 66.666667%;
      max-width: 100%;
      min-width: 0;
      min-height: 40px;
      flex-shrink: 1;
      box-sizing: border-box;
    }

    .wishlist-container {
      min-width: 0;
      flex-shrink: 1;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .info-item span {
      min-width: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    @media (max-width: 640px) {
      :host {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
      }

      .product-title {
        font-size: 1.5rem;
        line-height: 2rem;
      }

      .product-price {
        font-size: 1.5rem;
        line-height: 2rem;
      }

      .quantity-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .purchase-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
      }

      .purchase-button {
        width: 100%;
        min-width: 0;
      }

      .wishlist-container {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .info-item {
        align-items: flex-start;
      }
    }

    @media (max-width: 400px) {
      .product-title {
        font-size: 1.35rem;
        line-height: 1.75rem;
      }

      .purchase-button {
        font-size: 0.875rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
    }
  `,

  template: `
    <div class="text-xs rounded-xl bg-purple-600 text-white px-3 py-1 w-fit mb-2">
      {{ product().category | titlecase }}
    </div>

    <h1 class="product-title text-2xl sm:text-3xl font-extrabold mb-3">
      {{ product().name }}
    </h1>

    <p class="product-price text-2xl sm:text-3xl font-extrabold mb-4">
      {{ product().price | currency: 'BRL' : 'symbol' : '1.2-2' }}
    </p>

    <app-stock-status class="mb-4" [inStock]="product().inStock" />

    <p class="font-semibold mb-2">Descrição</p>

    <p class="product-description text-white border-b border-gray-200 pb-4">
      {{ product().description }}
    </p>

    <div class="quantity-container flex items-center gap-2 mb-3 pt-4">
      <span class="font-semibold"> Quantidade: </span>

      <app-qty-selector [quantity]="quantity()" (qtyUpdated)="quantity.set($event)" />
    </div>

    <div class="purchase-actions mb-4 border-b border-gray-200 pb-4">
      <button
        type="button"
        class="
    purchase-button
    flex
    items-center
    justify-center
    gap-2
    rounded-md
    text-white
    bg-gray-700
    transition-colors
    duration-200
    hover:!bg-[#8b5cf6]
    disabled:!bg-gray-600
    disabled:!text-gray-300
    disabled:hover:!bg-gray-600
  "
        (click)="cartStore.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon class="!text-[20px] !shrink-0"> shopping_cart </mat-icon>

        <span class="text-center break-words">
          {{ product().inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque' }}
        </span>
      </button>

      <div class="wishlist-container">
        <app-toggle-wishlist-button [product]="product()" />
      </div>
    </div>

    <div class="pt-6 flex flex-col gap-3 text-white text-xs">
      <div class="info-item">
        <mat-icon class="small !text-[#8b5cf6] !shrink-0"> bolt </mat-icon>

        <span> Entrega Imediata após a Compra, Exceto em Pré-Vendas </span>
      </div>

      <div class="info-item">
        <mat-icon class="small !text-[#8b5cf6] !shrink-0"> vpn_key </mat-icon>

        <span> Chave Digital </span>
      </div>

      <div class="info-item">
        <mat-icon class="small !text-[#8b5cf6] !shrink-0"> verified </mat-icon>

        <span> Compra Segura e Protegida </span>
      </div>

      <div class="info-item">
        <mat-icon class="small !text-[#8b5cf6] !shrink-0"> devices </mat-icon>

        <span> Ativação na Plataforma Indicada </span>
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
