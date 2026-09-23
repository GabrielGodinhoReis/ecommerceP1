import { Component, inject } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { RouterLink, Router } from '@angular/router';

import { MatButton, MatIconButton } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';

import { CartStore } from '../../cart-store';

import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-cart',

  imports: [
    CurrencyPipe,
    RouterLink,
    MatButton,
    MatIconButton,
    MatIcon,
  ],

  template: `
    <div
      class="max-w-[1200px] mx-auto p-4 sm:p-6 pb-24 text-white space-y-5 sm:space-y-6"
    >
      <h1 class="text-2xl sm:text-3xl font-bold">
        Meu Carrinho
      </h1>

      <!-- BANNER DA WISHLIST -->
      <div
        class="p-4 bg-gray-900 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <mat-icon class="!text-red-500">
            favorite
          </mat-icon>

          <div>
            <h3 class="font-bold text-white">
              Lista de Desejos ({{ wishlistStore.wishlistCount() }})
            </h3>

            <p class="text-sm text-gray-400">
              Você tem {{ wishlistStore.wishlistCount() }}
              itens salvos para depois
            </p>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <a
            routerLink="/wishlist"
            class="text-purple-400 hover:underline text-sm font-semibold text-center sm:text-left"
          >
            Ver Todos
          </a>

          @if (wishlistStore.wishlistCount() > 0) {
            <button
              matButton
              class="!bg-gray-700 !text-white !flex !items-center !justify-center !gap-2 !rounded-xl !px-4 sm:!px-5 !py-2.5 font-medium shadow-sm transition-all duration-200 hover:!bg-[#8b5cf6] w-full sm:w-auto"
              (click)="addAllFromWishlist()"
            >
              <mat-icon
                class="!m-0 !flex !items-center !justify-center !text-[20px] !leading-none"
              >
                shopping_cart
              </mat-icon>

              <span class="!leading-none">
                Adicionar Todos ao Carrinho
              </span>
            </button>
          }
        </div>
      </div>

      @if (store.cartCount() > 0) {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          <!-- ITENS DO CARRINHO -->
          <div class="lg:col-span-2 space-y-4">

            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2"
            >
              <h2 class="text-xl font-bold text-white">
                Itens do Carrinho ({{ store.cartCount() }})
              </h2>

              <button
                matButton
                class="!bg-gray-700 !text-[#ef4444] !flex !items-center !justify-center !gap-2 !rounded-xl !px-5 !py-2.5 font-medium shadow-sm transition-all duration-200 hover:!bg-[#ef4444] hover:!text-white w-full sm:w-auto"
                (click)="store.clearCart()"
              >
                <mat-icon
                  class="!m-0 !flex !items-center !justify-center !text-[20px] !leading-none"
                >
                  delete_sweep
                </mat-icon>

                <span class="!leading-none">
                  Esvaziar Carrinho
                </span>
              </button>
            </div>

            <!-- PRODUTOS -->
            @for (item of store.items(); track item.product.id) {
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-900 rounded-xl shadow-lg"
              >

                <!-- PRODUTO -->
                <div class="flex items-center gap-3 sm:gap-4 min-w-0">

                  <!-- CAPA -->
                  <img
                    [src]="
                      item.product.imageUrl ||
                      item.product.bannerUrl
                    "
                    [alt]="item.product.name"
                    class="w-[72px] h-[108px] sm:w-[88px] sm:h-[132px] object-cover rounded-lg shrink-0"
                    [style.view-transition-name]="
                      'product-image-' + item.product.id
                    "
                  />

                  <div class="min-w-0">
                    <h3
                      class="font-bold text-base sm:text-lg text-white truncate"
                    >
                      {{ item.product.name }}
                    </h3>

                    <p class="!text-[#8b5cf6] font-semibold">
                      {{ item.product.price | currency: 'BRL' }}
                    </p>
                  </div>
                </div>

                <!-- CONTROLES -->
                <div
                  class="flex items-center justify-end gap-1 sm:gap-3 w-full sm:w-auto"
                >

                  <!-- DIMINUIR QUANTIDADE -->
                  <button
                    mat-icon-button
                    (click)="
                      store.updateQuantity(
                        item.product.id,
                        -1
                      )
                    "
                  >
                    <mat-icon class="!text-white">
                      remove
                    </mat-icon>
                  </button>

                  <!-- QUANTIDADE -->
                  <span
                    class="font-bold text-lg text-white px-2 min-w-[32px] text-center"
                  >
                    {{ item.quantity }}
                  </span>

                  <!-- AUMENTAR QUANTIDADE -->
                  <button
                    mat-icon-button
                    (click)="
                      store.updateQuantity(
                        item.product.id,
                        1
                      )
                    "
                  >
                    <mat-icon class="!text-white">
                      add
                    </mat-icon>
                  </button>

                  <!-- REMOVER ITEM -->
                  <button
                    mat-icon-button
                    (click)="
                      store.removeFromCart(
                        item.product.id
                      )
                    "
                  >
                    <mat-icon class="!text-red-500">
                      delete
                    </mat-icon>
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- RESUMO DA COMPRA -->
          <div
            class="p-5 sm:p-6 bg-gray-900 rounded-xl shadow-lg h-fit space-y-4"
          >
            <h2
              class="text-xl font-bold border-b border-gray-800 pb-3 text-white"
            >
              Resumo da Compra
            </h2>

            <div
              class="space-y-3 max-h-[300px] overflow-y-auto pr-1"
            >
              @for (item of store.items(); track item.product.id) {
                <div
                  class="flex items-center justify-between gap-3"
                >
                  <div class="min-w-0">
                    <p
                      class="text-sm font-semibold text-white truncate"
                    >
                      {{ item.product.name }}
                    </p>

                    <p class="text-xs text-gray-400">
                      {{ item.quantity }}x
                      {{ item.product.price | currency: 'BRL' }}
                    </p>
                  </div>

                  <span
                    class="text-sm font-bold text-white whitespace-nowrap"
                  >
                    {{
                      item.product.price * item.quantity
                        | currency: 'BRL'
                    }}
                  </span>
                </div>
              }
            </div>

            <div
              class="flex justify-between text-xl font-extrabold border-t border-gray-800 pt-3 gap-3"
            >
              <span class="!text-green-400">
                Total:
              </span>

              <span
                class="!text-green-400 whitespace-nowrap"
              >
                {{ store.subtotal() | currency: 'BRL' }}
              </span>
            </div>

            <!-- FINALIZAR COMPRA -->
            <button
              matButton
              class="w-full !bg-gray-700 !text-white !flex !items-center !justify-center !rounded-xl !px-5 !py-3 !text-lg font-medium shadow-sm transition-all duration-200 hover:!bg-[#8b5cf6]"
              (click)="proceedToCheckout()"
            >
              <span
                class="!flex !items-center !justify-center !w-full !leading-none"
              >
                Finalizar Compra
              </span>
            </button>

            <!-- VOLTAR ÀS COMPRAS -->
            <a
              routerLink="/"
              matButton
              class="w-full !bg-gray-700 !text-white !flex !items-center !justify-center !gap-2 !rounded-xl !px-5 !py-3 !text-lg font-medium shadow-sm transition-all duration-200 hover:!bg-[#8b5cf6]"
            >
              <mat-icon
                class="!m-0 !flex !items-center !justify-center !text-[20px] !leading-none"
              >
                arrow_back
              </mat-icon>

              <span
                class="!flex !items-center !justify-center !leading-none"
              >
                Voltar às Compras
              </span>
            </a>
          </div>
        </div>

      } @else {

        <!-- CARRINHO VAZIO -->
        <div
          class="text-center py-12 sm:py-16 px-4 space-y-4 bg-gray-900 rounded-xl"
        >
          <mat-icon
            class="text-6xl text-gray-500 !w-16 !h-16 !text-[64px]"
          >
            shopping_cart
          </mat-icon>

          <h2
            class="text-xl sm:text-2xl font-bold text-white"
          >
            Seu carrinho está vazio
          </h2>

          <a
            routerLink="/"
            matButton
            class="!bg-gray-700 !text-white !inline-flex !items-center !justify-center !gap-2 !rounded-xl !px-5 !py-2.5 font-medium shadow-sm transition-all duration-200 hover:!bg-[#8b5cf6]"
          >
            Continuar Comprando
          </a>
        </div>
      }
    </div>
  `,
})
export default class Cart {
  store = inject(CartStore);

  wishlistStore = inject(EcommerceStore);

  router = inject(Router);

  addAllFromWishlist() {
    const items = this.wishlistStore.wishlistItems();

    if (items.length === 0) {
      return;
    }

    // Adiciona somente os produtos disponíveis
    const addedProducts = this.store.addManyToCart(items);

    // Remove da Wishlist SOMENTE os que foram adicionados
    addedProducts.forEach((product) => {
      this.wishlistStore.removeFromWishlistWithoutMessage(
        product
      );
    });
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}